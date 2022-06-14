import express, {Router} from "express";
import {authRouter} from "./routes/Authentication.Route";
import bodyParser from "body-parser";
import cors from "cors";
import {IUser} from "./interface/user.interface";
import jwt from "jsonwebtoken";
import {getSecretAccessToken} from "./utils/utils";
import {redisClient} from "./db/RedisConnect.db";

(async () => {
    await redisClient.connect();
})();
// redisClient.set("key", "value").then(() => console.log("set value"))
// redisClient.get("key").then(r => {console.log(r)})


const authServer = express();
authServer.use(bodyParser.json())
authServer.use(cors());




authServer.use(authRouter);
export {authServer};
