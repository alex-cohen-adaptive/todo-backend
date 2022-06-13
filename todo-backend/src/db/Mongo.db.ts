import mongoose from "mongoose";
import config from "../config/config";
import logging from "../config/logging";
import {NAMESPACE} from "../app";

export const mongo =  mongoose.connect(config.mongo.url, config.mongo.options)
    .then(result => {
        logging.info(NAMESPACE, 'connected to mongodb')
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    })

