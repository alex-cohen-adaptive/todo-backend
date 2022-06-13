import dotenv from 'dotenv'
dotenv.config()

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    // poolSize: 50,
    autoIndex: false,
    retryWrites: false
};
//
// const MONGO_USERNAME = process.env.MONGO_USERNAME || 'root';
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'password';
// const MONGO_HOST = process.env.MONGO_URL || `127.0.0.1:27017`;
// const MONGO_DB = process.env.MONGO_URL || `db`;

const MONGO_USERNAME ='root';
const MONGO_PASSWORD =  'password';
const MONGO_HOST = `127.0.0.1:27017`;
const MONGO_DB =  `db`;

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    // url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`
    url: `mongodb://${MONGO_HOST}/${MONGO_DB}`
};

const REDIS_HOST=process.env.REDIS_HOST || 'redis';
const REDIS_PORT=process.env.REDIS_PORT || '6379';


const REDIS = {
    host:REDIS_HOST,
    port: REDIS_PORT,
    url:`redis://${REDIS_HOST}:${REDIS_PORT}`
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET= process.env.REFRESH_TOKEN_SECRET;

const JWT ={
    secret: ACCESS_TOKEN_SECRET,
    refresh: REFRESH_TOKEN_SECRET
}
const config = {
    mongo: MONGO,
    redis:REDIS,
    server: SERVER,
    jwt: JWT
};



export default config;