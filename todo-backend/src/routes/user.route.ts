import express, {Router} from "express";
import {UserService} from "../service/user.service";
const userRouter = Router();
const app = express();

const userService:UserService = new UserService();

userRouter
    .put("/users/exists",async (req, res) => {
        // console.log(req.body)
        res.status(200).send(await userService.exists(req.body.email));
        // return next();
    })
app.use('/users', userRouter);
export {userRouter};