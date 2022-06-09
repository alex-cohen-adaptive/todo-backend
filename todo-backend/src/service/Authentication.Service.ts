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

export class AuthenticationService implements IAuthentication {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }


    private generateAccessToken = (email: IUser) => {
        console.log('generateAccessToken')

        return jwt.sign(email, getSecretAccessToken(), {expiresIn: '15s'})

    }

    async signIn(email: string, password: string): Promise<IAccessToken | Result> {
        try {
            const user = await this.userService.get(email)
            if (user === null) {
                return Promise.reject(Result.FAILURE);
            }
            if (await bcrypt.compare(password, user.password)) {
                if (config.jwt.secret && config.jwt.refresh) {
                    const accessToken = this.generateAccessToken(user);
                    console.log('passed')

                    const refreshToken = jwt.sign(user, config.jwt.refresh);

                    // const accessToken = jwt.sign({email: user.email}, config.jwt.secret)
                    return Promise.resolve({accessToken: accessToken, refreshToken: refreshToken});
                }
            }
            return Promise.resolve(Result.FAILURE);
        } catch {
            return Promise.resolve(Result.FAILURE);
        }
    }

    verifyToken(req: e.Request, res: e.Response, next: e.NextFunction): void {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            res.send(401);
            return;
        }
        if (config.jwt.secret) {
            jwt.verify(token, config.jwt.secret, (error: any, user: any) => {
                    if (error) {
                        return Promise.resolve(Result.FAILURE);
                    }
                    req.body.user = user;
                }
            )
        }
        next();
    }

}

