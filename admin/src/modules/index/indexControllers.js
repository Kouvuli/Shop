import adminService from "../../services/adminService";
const indexControllers = {
    async index(req, res) {
        res.render("index", { title: "Dashboard" });
    },
    async login(req, res) {
        const { failure = false } = req.query;
        const title = "Đăng nhập";
        res.render("admin/login", { failure, title });
    },
    async logout(req, res) {
        req.logout();
        res.locals.user = null;
        res.redirect("/");
    },
};

export default indexControllers;
