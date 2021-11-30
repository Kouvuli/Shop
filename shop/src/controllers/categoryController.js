import _ from "lodash";
import categoryService from "../services/productService";

const categoryControllers = {
    async speakerProducts(req, res) {
        const perPage = 9;
        const type = "Loa";
        const { page = 1, brand = "", status = "" } = req.query;
        const { data, total } = await categoryService.getProducts({
            page,
            perPage,
            type,
            manufacturerName: brand,
        });

        const state = {
            title: "Loa",
            page,
            perPage: Math.min(perPage, data.length),
            data,
            total,
            layout: "layouts/main",
        };
        if (_.isEmpty(req.body)) {
            res.render("category/loa", {
                ...state,
                pagination: {
                    page,
                    limit: Math.ceil(total / perPage),
                    perPage: perPage,
                },
            });
        }
    },
    async headphoneProducts(req, res) {
        const perPage = 9;
        const type = "Tai nghe";
        const { page = 1, brand = "", status = "" } = req.query;
        const { data, total } = await categoryService.getProducts({
            page,
            perPage,
            type,
            manufacturerName: brand,
        });

        const state = {
            title: "Tai nghe",
            page,
            perPage: Math.min(perPage, data.length),
            total,
            data,
            layout: "layouts/main",
        };
        if (_.isEmpty(req.body)) {
            res.render("category/tai-nghe", {
                ...state,
                pagination: {
                    page,
                    limit: Math.ceil(total / perPage),
                    perPage: perPage,
                },
            });
        }
    },
    async playerProducts(req, res) {
        const perPage = 9;
        const type = "Máy nghe nhạc";
        const { page = 1, brand = "", status = "" } = req.query;
        const { data, total } = await categoryService.getProducts({
            page,
            perPage,
            type,
            manufacturerName: brand,
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
            pagination: {
                page,
                limit: Math.ceil(total / perPage),
                perPage: perPage,
            },
        });
    },
    async microphoneProducts(req, res) {
        const perPage = 9;
        const type = "Microphone";
        const { page = 1, brand = "", status = "" } = req.query;
        const { data, total } = await categoryService.getProducts({
            page,
            perPage,
            type,
            manufacturerName: brand,
        });
        const state = {
            title: "Microphone",
            page,
            perPage: Math.min(perPage, data.length),
            total,
            data,
            layout: "layouts/main",
        };
        res.render("category/microphone", {
            ...state,
            pagination: {
                page,
                limit: Math.ceil(total / perPage),
                perPage: perPage,
            },
        });
    },
};

export default categoryControllers;
