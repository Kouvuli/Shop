import expressSession from 'express-session'
import cookieParser from 'cookie-parser'
import _ from 'lodash'
import connectMongodbSession from 'connect-mongodb-session';
import helpers from '../helper';

const useSession = (app) => {
    const MongoDBStore = connectMongodbSession(expressSession)

    const store = new MongoDBStore({
        uri: `mongodb+srv://nguyenkhavi:${process.env.MONGODB_PASSWORD}@cluster0.vo4ad.mongodb.net/${process.env.MONGODB_NAME}`,
        collection: 'sessions'
    });

    store.on('error', function (sessionStoreErr) {
        console.log({ sessionStoreErr });
    });

    app.use(cookieParser());
    app.use(expressSession({
        genid: (req) => {
            return helpers.genId()
        },
        store: store,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30//1 month
        }
    }));

}

export default useSession