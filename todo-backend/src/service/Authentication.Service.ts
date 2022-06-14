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
import {redisClient} from "../db/RedisConnect.db";

export class AuthenticationService implements IAuthentication {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }


    private generateAccessToken = (email: IUser) => {
        return jwt.sign({email: email.email}, getSecretAccessToken(), {expiresIn: '59s'})
    }

    async signIn(email: string, password: string): Promise<IAccessToken | Result> {
        try {
            const user = await this.userService.get(email)
            if (user == null) {
                return Promise.reject(Result.FAILURE);
            }
            // console.log(await bcrypt.compare(password, user.password));
            if (await bcrypt.compare(password, user.password)) {
                console.log("wtf")
                if (config.jwt.secret && config.jwt.refresh) {
                    console.log("wtf")
                    const accessToken = this.generateAccessToken(user);
                    const refreshToken = jwt.sign({email: user.email}, config.jwt.refresh);

                    //todo push the refresh token to the redis db
                    const result = await redisClient.SET(user.email.toString(), refreshToken);
                    // console.log(result);
                    console.log(await redisClient.GET(user.email.toString()))

                    // const accessToken = jwt.sign({email: user.email}, config.jwt.secret)
                    return Promise.resolve({accessToken: accessToken, refreshToken: refreshToken});
                }
            }
            return Promise.resolve(Result.FAILURE);
        } catch {
            console.log("err")
            return Promise.resolve(Result.FAILURE);
        }
    }


    verifyToken(req: any, res: any, next: any): void {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log(token);
        if (token == null) {
            res.send(401);
            return;
        }
        config.jwt.secret && jwt.verify(token, config.jwt.secret, (error: any, user: any) => {
                console.log(error);
                if (error) {
                    res.send(401);
                    return
                }
                req.user = user;
                next();
            }
        )
    }

    async refreshToken(refreshToken: string): Promise<IAccessToken | Result> {
        if (refreshToken == undefined) {
            //    todo error handling
        }

        let storedRefresh:string|null='';
        let userEmail:string ='';
        if (config.jwt.refresh) {
            await jwt.verify(refreshToken, config.jwt.refresh, async (err: any, user: any) => {
                if (err) {
                    return Promise.resolve(Result.FAILURE);
                }
                storedRefresh = await redisClient.get(user.email.toString());
                userEmail = user.email;

            })
        }
        //todo error handling here
        if (storedRefresh==null) {
            console.log("token is null");
        }
        if (storedRefresh !== refreshToken) {
            console.log('doesnt match');
        }
        const accessToken = this.generateAccessToken({
            email: userEmail,
            firstName: '',
            lastName: '',
            password: ''
        });
        return Promise.resolve({accessToken: accessToken, refreshToken: refreshToken});
        // console.log('here')
        // return Promise.resolve(Result.FAILURE);
    }

}

