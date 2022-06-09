import express, {Router} from "express";
import {UserService} from "../service/user.service";

const userRouter = Router();
const app = express();

const userService: UserService = new UserService();

userRouter
    .put("/users/exists", async (req, res) => {
        console.log(req.body)
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
        res.status(200).send(userService.get(req.params.id));

    })
    .get("/users", async(req, res) => {
        res.status(200).send(await userService.getAll());
    })

app.use('/users', userRouter);
export {userRouter};