import _ from "lodash";
import userService from "../../services/userService";
import mailService from "../../services/mailService";
import bcrypt from "bcryptjs";
const authController = {
    async login(req, res) {
        const {
            emptyData = false,
            exist = false,
            success = false,
            failure = false,
            logout = false,
            resetSuccess = false,
            wrong = false,
            payment = false,
        } = req.query;
        const state = {
            title: "Đăng nhập",
        };
        res.render("auth/login", {
            ...state,
            layout: "login",
            emptyData,
            exist,
            success,
            failure,
            logout,
            resetSuccess,
            wrong,
            payment,
        });
    },
    async forgot(req, res) {
        const { notExist = false } = req.query;
        const state = {
            title: "Quên mật khẩu",
        };

        res.render("auth/forgot-password", { ...state, notExist });
    },
    async sendEmail(req, res) {
        const { email } = req.body;

        const user = await userService.getUserByEmail({ email });

        if (!user) {
            res.redirect("/auth/forgot-password?notExist=true");
        }

        const newPass = `${parseInt(10000000 + Math.random() * 10000000 - 1)}`;
        await userService.updateResetPassword({
            id: user._id,
            resetPassword: bcrypt.hashSync(newPass, bcrypt.genSaltSync(10)),
        });
        const message = `Mật khẩu mới của bạn là ${newPass}`;
        mailService.sendForgotPassword({ email, username: user.name, message });
        res.redirect("/auth/login?resetSuccess=true");
    },
    async logout(req, res) {
        req.logout();
        res.locals.user = null;
        res.redirect("/auth/login?logout=true");
    },
    async register(req, res) {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            res.redirect("/auth/login?emptyData=true");
        }
        const exist = await userService.getUserByUsername({ username });

        if (!_.isEmpty(exist)) {
            res.redirect("/auth/login?exist=true");
        }
        try {
            await userService.createNewUser({
                username,
                name,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                email,
            });
            res.redirect("/auth/login?success=true");
        } catch (e) {
            console.log({ e });

            res.redirect("/auth/login?failure=true");
        }
    },
};

export default authController;
