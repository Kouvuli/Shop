import _ from "lodash";
import userService from "../../services/userService";
import cartService from "../../services/cartService";

const userControllers = {
    async profile(req, res) {
        const id = req.user;
        const data = await userService.getUserById({ id });

        const state = {
            title: "Thông tin cá nhân",
            data,
            layout: "user",
        };
        res.render("user/profile", { ...state });
    },
    async cart(req, res) {
        const id = req.user || req.sessionID; //middleware
        const data = await cartService.getCartByUserId({ userId: id });

        const state = {
            title: "Giỏ hàng",
            data,
            layout: "user",
        };
        res.render("user/cart", { ...state });
    },
    async payCart(req, res) {
        const id = req.user;
        const data = await cartService.getCartByUserId({ userId: id });

        const state = {
            title: "Thanh toán",
            data,
            layout: "user",
        };
        res.render("user/payCart", { ...state });
    },
    async notification(req, res) {
        const state = {
            title: "Thông báo",
            layout: "user",
        };
        res.render("user/notifications", { ...state });
    },

    async liked(req, res) {
        const state = {
            title: "Đã thích",
            layout: "user",
        };
        res.render("user/likes", { ...state });
    },
};

export default userControllers;
