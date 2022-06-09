import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {router} from "./routes/Todo.Route";
import {userRouter} from "./routes/User.Route";

const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(router);
server.use(userRouter);


export {server};