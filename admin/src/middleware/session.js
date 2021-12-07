import expressSession from 'express-session'
import cookieParser from 'cookie-parser'
import _ from 'lodash';


const useSession = (app) => {

    app.use(cookieParser());
    app.use(expressSession({
        genid: function (req) {

            return _.uniqueId('admin_')
        },
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 1//an hour
        }
    }));
    app.use((req, res, next) => {
        res.locals.session = req.session;
        next();
    });
}

export default useSession