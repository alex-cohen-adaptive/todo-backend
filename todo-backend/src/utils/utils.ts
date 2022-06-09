import config from "../config/config";

export const getSecretAccessToken = ():string => {
    return config.jwt.secret ? config.jwt.secret : '';
}