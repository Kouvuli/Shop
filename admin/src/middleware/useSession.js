import expressSession from 'express-session'
import cookieParser from 'cookie-parser'


const useSession = (app) => {
    app.use(cookieParser());
    app.use(expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 1//an hour
        }
    }));
}

export default useSession