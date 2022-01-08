import adminService from "../../services/adminService";
import userService from "../../services/userService";
import productService from "../../services/productService";
import orderService from "../../services/orderService";
const indexControllers = {
    async index(req, res) {
        const { total: totalUser } = await userService.getUsers({});
        const { total: totalProduct } = await productService.getProducts({});
        const { total: totalOrder } = await orderService.getOrders({});
        const { total: totalSales } = await orderService.getSales();

        const state = {
            totalUser,
            totalProduct,
            totalOrder,
            totalSales,
        };
        res.render("index", { title: "Dashboard", ...state });
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
