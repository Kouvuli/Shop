import passport from "passport";
import bcrypt from "bcryptjs";

import userService from "../services/userService";
import { Strategy as LocalStrategy } from "passport-local";

const usePassport = (app) => {
    passport.use(
        new LocalStrategy(async function (username, password, done) {
            try {
                const user = await userService.getUserByUsername({
                    username: username,
                });
                if (!user) {
                    return done(null, false);
                }
                const userId = user._id;
                const isOk = bcrypt.compareSync(password, user.password);
                if (!isOk) {
                    let isReset = false;
                    if (user.resetPassword) {
                        isReset = bcrypt.compareSync(
                            password,
                            user.resetPassword
                        );
                    }
                    if (!isReset || !user.resetPassword) {
                        return done(null, false);
                    }
                    //set password is reset password
                    await userService.updatePassword({ id: userId, password });
                    //set reset password is empty
                    await userService.updateResetPassword({
                        id: userId,
                        resetPassword: "",
                    });
                } else {
                    //if have reset password but user use old password then delete reset password
                    if (user.resetPassword)
                        await userService.updateResetPassword({
                            id: userId,
                            resetPassword: "",
                        });
                }

                return done(null, userId);
            } catch (err) {
                return done(null, err);
            }
        })
    );
    passport.serializeUser(function (id, done) {
        done(null, id);
    });

    passport.deserializeUser(function (id, done) {
        done(null, id);
    });
    app.use(passport.initialize());
    app.use(passport.session());
};

export default usePassport;
