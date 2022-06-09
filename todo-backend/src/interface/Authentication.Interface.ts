import {IAccessToken} from "./AccessToken.interface";
import {Result} from "../service/Todo.Service";
import {NextFunction, Response, Request} from "express";

export interface IAuthentication {
    signIn(email: string, password: string): Promise<IAccessToken | Result>;

    verifyToken(req: Request, res: Response, next: NextFunction): void;
}