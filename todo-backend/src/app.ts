import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import logging from "./config/logging";
import {server} from "./Server";
import {authServer} from "./AuthServer";
// const app = express();

export const NAMESPACE = 'Server';

mongoose.connect(config.mongo.url, config.mongo.options)
    .then(result => {
        logging.info(NAMESPACE, 'connected to mongodb')
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    })
// mongoose.connect("mongodb://admin:password@localhost:27017")

// app.use(bodyParser.json())
// app.use(cors());
//
// app.use(router);
// app.use(userRouter);

const whitelist = ["http://localhost:3000"]


server.listen(3000, () => {
    console.log('Regular Server - Listening to Port 3000');
});
authServer.listen(3001, () => {
    console.log('Authorization Server - Listening to Port 3001');

})
// module.exports = app; // for testing
