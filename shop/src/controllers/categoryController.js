import _ from "lodash";
import categoryService from "../services/productService";

const categoryControllers = {
    async speakerProducts(req, res) {
        const perPage = 9;
        const type = "Loa";
        const { page = 1 } = req.query;
        const { data, total } = await categoryService.getProducts({
            page,
            perPage,
            type,
        });

        const state = {
            title: "Loa",
            page,
            perPage,
            data,
            layout: "layouts/main",
        };
        if (_.isEmpty(req.body)) {
            res.render("category/loa", {
                ...state,
            });
        }
    },
    async headphoneProducts(req, res) {
        const perPage = 9;
        const type = "Tai nghe";
        const { page = 1 } = req.query;
        const { data, total } = await categoryService.getProducts({
            page,
            perPage,
            type,
        });

        const state = {
            title: "Tai nghe",
            page,
            perPage,
            data,
            layout: "layouts/main",
        };
        if (_.isEmpty(req.body)) {
            res.render("category/tai-nghe", {
                ...state,
            });
        }
    },
    async playerProducts(req, res) {
        const perPage = 9;
        const type = "Máy nghe nhạc";
        const { page = 1 } = req.query;
        const { data, total } = await categoryService.getProducts({
            page,
            perPage,
            type,
        });

        const state = {
            title: "Máy nghe nhạc",
            page,
            perPage,
            data,
            layout: "layouts/main",
        };
        res.render("category/may-nghe-nhac", {
            ...state,
        });
    },
    async microphoneProducts(req, res) {
        const perPage = 9;
        const type = "Microphone";
        const { page = 1 } = req.query;
        const { data, total } = await categoryService.getProducts({
            page,
            perPage,
            type,
        });
        const state = {
            title: "Microphone",
            page,
            perPage,
            data,
            layout: "layouts/main",
        };
        res.render("category/microphone", {
            ...state,
        });
    },
};

export default categoryControllers;
