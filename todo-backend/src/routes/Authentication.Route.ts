import express, {Router} from "express";
import {Result} from "../service/Todo.Service";
import {HttpStatusCode} from "../error/StatusCodes.Enum";
import {AuthenticationService} from "../service/Authentication.Service";
import {userRouter, userService} from "./User.Route";
import {UserService} from "../service/User.Service";

const authRouter = Router();
const app = express();


export const authenticationService: AuthenticationService = new AuthenticationService(new UserService());

authRouter.post("/authenticate", async (req, res) => {
    console.log(req.body);
    const result = await authenticationService.signIn(req.body.login);
    console.log(result)
    if (result === Result.FAILURE) {
        res.sendStatus(HttpStatusCode.UNAUTHORIZED);
    } else {
        res.status(HttpStatusCode.OK).send(result);
    }

})
    .post("/verify-token", async (req, res, next) => {
        // res.sendStatus(HttpStatusCode.OK).send(authenticationService.verifyToken(req));
        authenticationService.verifyToken(req, res, next);
    })
    .post('/token', async (req, res, next) => {
        const refreshToken = req.body.refreshToken;
        const result = await authenticationService.refreshToken(refreshToken);
        console.log(result)
        res.send(result);
    })
    .post('/logout', async (req, res) => {
        res.send(authenticationService.logout(await req.body.refreshToken));
    })

app.use('/', authRouter);
export {authRouter};