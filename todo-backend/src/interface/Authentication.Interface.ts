import {IAccessToken} from "./AccessToken.interface";
import {Result} from "../service/Todo.Service";
import {NextFunction, Response, Request} from "express";
import {ILogin} from "./login.interface";

export interface IAuthentication {

    refreshToken(refreshToken: string, ): Promise<IAccessToken | Result>;

    signIn(login:ILogin): Promise<IAccessToken | Result>;

    verifyToken(req: Request, res: Response, next: NextFunction): void;
}