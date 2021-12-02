import expressSession from 'express-session'
import cookieParser from 'cookie-parser'
import connectRedis from 'connect-redis'
import * as redis from 'redis'
import _ from 'lodash'



const useSession = (app) => {
    const redisClient = redis.createClient()
    const RedisStore = connectRedis(expressSession)

    app.use(cookieParser());
    app.use(expressSession({
        genid: (req) => {
            return _.uniqueId()
        },
        // store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30//1 month
        }
    }));

    redisClient.on('error', (err) => {
        console.log('Redis error: ', err);
    });
}

export default useSession