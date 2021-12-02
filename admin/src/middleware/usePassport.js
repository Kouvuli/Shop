import passport from "passport";
import bcrypt from 'bcryptjs'

import adminService from '../services/adminService'
import { Strategy as LocalStrategy } from "passport-local";


const usePassport = (app) => {
    passport.use(new LocalStrategy(
        async function (username, password, done) {
            try {
                const user = await adminService.getAdminByUsername({ username: username })
                if (!user) {
                    return done(null, false);
                }
                const isOk = bcrypt.compareSync(password, user.password)
                if (!isOk) {
                    return done(null, false);
                }
                delete user.password
                app.locals.user = user;
                return done(null, user._id);
            } catch (err) {
                return done(null, err);
            }

        })
    )
    passport.serializeUser(function (id, done) {
        done(null, id);
    });

    passport.deserializeUser(function (id, done) {
        done(null, id);

    });
    app.use(passport.initialize());
    app.use(passport.session());
}

export default usePassport