import _ from "lodash";
import productService from "../../services/productService";
import logService from "../../services/logService";
import cacheService from "../../services/cacheService";
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
        let categories = await cacheService.get("categories");
        if (!categories) {
            categories = await productService.getCategories();
            await cacheService.set("categories", categories, 60 * 60 * 12);
        }
        //Cache for a day

        let manufacturers = await cacheService.get("manufacturers");
        if (!manufacturers) {
            manufacturers = await productService.getManufacturers();
            await cacheService.set(
                "manufacturers",
                manufacturers,
                60 * 60 * 12
            );
        }

        const { name = "" } =
            (await productService.getCategoryByKey({ key: category })) ||
            (await productService.getManufacturerByKey({
                key: manufacturer,
            })) ||
            {};
        const cacheKey = `products_${page}_${perPage}_${category}_${manufacturer}_${price}_${q}`;
        let { data, total } = (await cacheService.get(cacheKey)) || {};
        if (!data || !total) {
            //Query database
            console.log("Query database", cacheKey);

            const list = await productService.getProducts({
                page,
                perPage,
                category,
                manufacturer,
                q,
                isAsc: price === "asc",
            });
            data = list.data;
            total = list.total;
            await cacheService.set(cacheKey, { data, total }, 60 * 60 * 12); //12 hours
        }

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
            q,
            price,
            manufacturer,
            category,
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

        let data = await cacheService.get(`product_${id}`);
        if (!data) {
            data = await productService.getProductById({ id });
            await cacheService.set(`product_${id}`, data, 60 * 30); //30 minutes
        }

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
