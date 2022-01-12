import _ from "lodash";
import productService from "../../services/productService";

const productControllers = {
    async allProducts(req, res) {
        const { page = 1, category = "", manufacturer = "" } = req.query;
        const perPage = 9;
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
        });
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
        const data = await productService.getProductById({ id });

        const { data: relatedProducts } =
            await productService.getRelatedProducts({
                product: data,
            });

        const state = {
            title: data.name,
            data,
            relatedProducts: relatedProducts.map((pro) => {
                pro.image1 = pro.images[0];
                pro.image2 = pro.images[2];
                return pro;
            }),
            image1: data.images[0],
        };
        if (_.isEmpty(req.body)) {
            res.render("products/detail", {
                ...state,
            });
        }
    },
};

export default productControllers;
