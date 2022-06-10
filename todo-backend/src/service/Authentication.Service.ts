import {IAccessToken} from "../interface/AccessToken.interface";
import {Result} from "./Todo.Service";
import bcrypt from "bcrypt";
import config from "../config/config";
import jwt from "jsonwebtoken";
import {IAuthentication} from "../interface/Authentication.Interface";
import e, {NextFunction} from "express";
import {UserService} from "./User.Service";
import {IUser} from "../interface/user.interface";
import {getSecretAccessToken} from "../utils/utils";
import {log} from "util";
import {combineTableNames} from "sequelize/types/utils";

export class AuthenticationService implements IAuthentication {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }


    private generateAccessToken = (email: IUser) => {
        return jwt.sign({email: email.email}, getSecretAccessToken(), {expiresIn: '30s'})
    }

    async signIn(email: string, password: string): Promise<IAccessToken | Result> {
        try {
            const user = await this.userService.get(email)
            if (user == null) {
                return Promise.reject(Result.FAILURE);
            }
            console.log(await bcrypt.compare(password, user.password));
            if (await bcrypt.compare(password, user.password)) {
                console.log("wtf")
                if (config.jwt.secret && config.jwt.refresh) {
                    console.log("wtf")


                    const accessToken = this.generateAccessToken(user);
                    // console.log("dsds")
                    const refreshToken = jwt.sign({email: user.email}, config.jwt.refresh);
                    // const accessToken = jwt.sign({email: user.email}, config.jwt.secret)
                    return Promise.resolve({accessToken: accessToken, refreshToken: refreshToken});
                }
            }
            return Promise.resolve(Result.FAILURE);
        } catch {
            console.log()
            return Promise.resolve(Result.FAILURE);
        }
    }


    verifyToken(req: any, res: any, next: any): void {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null
        ) {
            res.send(401);
            return;
        }
        config.jwt.secret && jwt.verify(token, config.jwt.secret, (error: any, user: any) => {
                if (error) {
                    res.send(401);
                    return
                }
                req.user = user;
                next();
            }
        )
    }

}

