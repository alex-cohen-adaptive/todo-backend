import * as redis from "redis";
import config from "../config/config";

const redisClient =  redis.createClient();
redisClient.on('connect',() => {
    console.log('Redis Client Connected');
});
export {redisClient};
