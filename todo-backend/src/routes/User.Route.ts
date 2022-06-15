import express, {Router} from "express";
import {UserService} from "../service/User.Service";
import {authenticationService} from "./Authentication.Route";


const userRouter = Router();
const app = express();

export const userService: UserService = new UserService();

userRouter
    .put("/users/exists", async (req, res) => {
        res.status(200).send(await userService.exists(req.body.email));
        // return next();
    })
    .post("/users", async (req, res) => {
        userService.create(req.body)
            .then(result => {
                    console.log(result);
                    res.sendStatus(201).send(result);
                }
            )
            .catch(err => {
                res.sendStatus(403).send("User already exists")
            })
    })
    .get("/users/:id", async (req, res) => {
        console.log(req.body);
        res.sendStatus(200).send(userService.get(req.params.id));

    })
    .get("/users", authenticationService.verifyToken, async (req, res) => {
        res.status(200).send(await userService.getAll());
    })

// userRouter.use()
app.use('/users', userRouter);
export {userRouter}

// export {userRouter};