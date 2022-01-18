import _ from "lodash";
import userService from "../../services/userService";
import mailService from "../../services/mailService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
            change = false,
            active = false,
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
            change,
            active,
        });
    },
    async forgot(req, res) {
        const { notExist = false } = req.query;
        const state = {
            title: "Quên mật khẩu",
            layout: "login",
        };

        res.render("auth/forgot-password", { ...state, notExist });
    },
    async changePassword(req, res) {
        const { notMatch = false, wrong = false } = req.query;
        const state = {
            title: "Đổi mật khẩu",
            layout: "login",
            notMatch,
            wrong,
        };

        res.render("auth/change-password", { ...state });
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
        mailService.sendMail({ email, username: user.name, message });
        res.redirect("/auth/login?resetSuccess=true");
    },
    async logout(req, res) {
        req.logout();
        res.locals.user = null;
        res.redirect("/auth/login?logout=true");
    },
    async active(req, res) {
        const { token } = req.params;
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            await userService.activeById({ id });
            return res.redirect("/auth/login?active=true");
        } catch (e) {
            return res.render("error", { message: "Không tồn tại đường dẫn!" });
        }
    },
    async register(req, res) {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.redirect("/auth/login?emptyData=true");
        }
        const exist = await userService.getUserByEmail({ email });

        if (!_.isEmpty(exist)) {
            return res.redirect("/auth/login?exist=true");
        }
        try {
            const user = await userService.createNewUser({
                username,
                name,
                password,
                email,
            });
            const { _id } = user;
            const token = jwt.sign({ id: _id }, process.env.JWT_SECRET);
            const message = `Nhấn vào đường dẫn bên dưới để kích hoạt tài khoản`;
            const url = `${process.env.BASE_URL}/auth/active/${token}`;
            mailService.sendMail({
                email,
                username: user.name || user.username,
                message,
                url,
                subject: "Kích hoạt tài khoản",
            });
            return res.redirect("/auth/login?success=true");
        } catch (e) {
            console.log({ e });

            return res.redirect("/auth/login?failure=true");
        }
    },
    async handler(req, res) {
        const { password, newPassword, confirmPassword } = req.body;
        const id = req.user;
        const user = await userService.getUserById({ id });

        const isOk = bcrypt.compareSync(password, user.password);

        if (!isOk) {
            return res.redirect("/auth/change-password?wrong=true");
        }

        if (newPassword !== confirmPassword) {
            return res.redirect("/auth/change-password?notMatch=true");
        }
        await userService.updatePassword({
            id,
            password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10)),
        });
        res.redirect("/auth/login?change=true");
    },
};

export default authController;
