import passport from "passport";
import bcrypt from 'bcryptjs'

import userService from '../services/userService'
import { Strategy as LocalStrategy } from "passport-local";


const usePassport = (app) => {
    passport.use(new LocalStrategy(
        async function (username, password, done) {
            try {
                const user = await userService.getUserByUsername({ username: username })
                if (!user) {
                    return done(null, false);
                }
                const isOk = bcrypt.compareSync(password, user.password)
                if (!isOk) {
                    return done(null, false);
                }
                delete user.password
                app.locals.user = user;
                return done(null, user);
            } catch (err) {
                return done(null, err);
            }

        })
    )
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        done(null, id);

    });
    app.use(passport.initialize());
    app.use(passport.session());
}

export default usePassport