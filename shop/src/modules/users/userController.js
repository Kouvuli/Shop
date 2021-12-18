import _ from "lodash";
import userService from "../../services/userService";
const userControllers = {
    async profile(req, res) {
        const id = req.user
        const data = await userService.getUserById({ id })

        const state = {
            title: "Thông tin cá nhân",
            data,
            layout: "layouts/user",
        };
        res.render("user/profile", { ...state });
    },
    async cart(req, res) {
        const state = {
            title: "Giỏ hàng",
            layout: "layouts/user",
        };
        if (_.isEmpty(req.body)) {
            res.render("user/cart", { ...state });
        }
    },

    async notification(req, res) {
        const state = {
            title: "Thông báo",
            layout: "layouts/user",
        };
        if (_.isEmpty(req.body)) {
            res.render("user/notifications", { ...state });
        }
    },
    async liked(req, res) {
        const state = {
            title: "Đã thích",
            layout: "layouts/user",
        };
        if (_.isEmpty(req.body)) {
            res.render("user/likes", { ...state });
        }
    },
};

export default userControllers;
