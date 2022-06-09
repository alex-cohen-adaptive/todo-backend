import express, {Router} from "express";
import {Result} from "../service/Todo.Service";
import {HttpStatusCode} from "../error/StatusCodes.Enum";
import {AuthenticationService} from "../service/Authentication.Service";
import {userRouter, userService} from "./User.Route";

const authRouter = Router();
const app = express();


const authenticationService: AuthenticationService = new AuthenticationService(userService);

authRouter.post("/authenticate", async (req, res) => {
    const result = await authenticationService.signIn(req.body.email, req.body.password);
    console.log(result)
    if (result === Result.FAILURE) {
        res.sendStatus(HttpStatusCode.UNAUTHORIZED);
    } else {
        res.status(HttpStatusCode.OK).send(result);
    }

})
    .post("/verify-token", async (req, res,next) => {
        // res.sendStatus(HttpStatusCode.OK).send(authenticationService.verifyToken(req));
        authenticationService.verifyToken(req,res,next);
    })

app.use('/', authRouter);
export {authRouter};