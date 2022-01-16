import _ from "lodash";
import productService from "../../services/productService";
import logService from "../../services/logService";
const productControllers = {
    async allProducts(req, res) {
        const {
            page = 1,
            category = "",
            manufacturer = "",
            price = "",
            q = "",
        } = req.query;
        const perPage = 9;
        const userId = req.user || req.sessionID;
        const categories = await productService.getCategories();
        const manufacturers = await productService.getManufacturers();
        const { name = "" } =
            (await productService.getCategoryByKey({ key: category })) ||
            (await productService.getManufacturerByKey({ key: category })) ||
            {};
        const { data, total } = await productService.getProducts({
            page,
            perPage,
            category,
            manufacturer,
            q,
            isAsc: price === "asc",
        });
        //Log
        for (const pro of data) {
            logService.create({
                userId,
                action: "view",
                objectId: pro?._id,
            });
        }
        const state = {
            title: name || "Tất cả sản phẩm",
            page,
            perPage,
            categories,
            manufacturers,
            data,
            total,
        };
        res.render("products/index", {
            ...state,
            pagination: {
                page,
                limit: Math.ceil(total / perPage),
                perPage: perPage,
            },
        });
    },
    async productDetail(req, res) {
        const { id } = req.params;
        const userId = req.user || req.sessionID;

        const data = await productService.getProductById({ id });

        logService.create({
            userId,
            action: "view",
            objectId: data?._id,
        });

        const { data: relatedProducts } =
            await productService.getRelatedProducts({
                product: data,
            });
        for (const pro of relatedProducts) {
            logService.create({
                userId,
                action: "view",
                objectId: pro?._id,
            });
        }
        const state = {
            title: data.name,
            data,
            relatedProducts: relatedProducts.map((pro) => {
                pro.image1 = pro.images[0];
                pro.image2 = pro.images[2];
                return pro;
            }),
            views: (data.views || []).length,
            image1: data.images[0],
        };
        res.render("products/detail", {
            ...state,
        });
    },
};

export default productControllers;
