import _ from "lodash";
import userService from "../services/userService";
import bcrypt from 'bcryptjs'
const authController = {
    async login(req, res) {
        const { emptyData = false, exist = false, success = false, failure = false, logout } = req.query
        const state = {
            title: "Đăng nhập",
            layout: "layouts/login",
        };
        res.render("auth/login", { ...state, emptyData, exist, success, failure, logout });
    },
    async logout(req, res) {

        req.logout()

        res.redirect('/auth/login?logout=true')
    },
    async register(req, res) {
        const { name, username, email, password } = req.body

        if (!name || !username || !email || !password) {
            res.redirect('/auth/login?emptyData=true')
        }
        const exist = await userService.getUserByUsername({ username })

        if (!_.isEmpty(exist)) {
            res.redirect('/auth/login?exist=true')
        }
        try {
            await userService.createNewUser({ username, name, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)), email })
            res.redirect("/auth/login?success=true");
        } catch (e) {
            res.redirect("/auth/login?failure=true");
        }
    },
};

export default authController;
