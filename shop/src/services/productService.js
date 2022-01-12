import _ from "lodash";
import productModel from "../models/productModel";
import categoryModel from "../models/categoryModel";
import manufacturerModel from "../models/manufacturerModel";
import logService from "./logService";
const productService = {
    async getProductById({ id = "" }) {
        const views = await logService.getLogsByObjectId({ objectId: id });
        const data = await productModel.findOne({ _id: id, active: 1 }).lean();
        return { ...data, views };
    },
    async getProducts({
        q = "",
        page = 1,
        perPage = 10,
        category = "",
        manufacturer = "",
    }) {
        const p = Math.max(parseInt(page), 1);
        const pp = parseInt(perPage);
        const filter = { active: 1 };
        if (!_.isEmpty(manufacturer)) {
            filter["manufacturer.key"] = manufacturer;
        }
        if (!_.isEmpty(category)) {
            filter["category.key"] = category;
        }
        if (!_.isEmpty(q)) {
            filter["$or"] = [
                { name: { $regex: q } },
                { "category.type": { $regex: q } },
                { "manufacturer.name": { $regex: q } },
            ];
        }

        const data = await productModel
            .find(filter)
            .skip(pp * p - pp)
            .limit(pp)
            .lean();
        const total = await productModel.countDocuments(filter);

        // for (const product of data) {
        //     const { manufacturer = {} } = product
        //     const { name, key } = manufacturer
        //     if (name && key) {
        //         const manu = await manufacturerModel.findOne({ key })
        //         if (!manu) {
        //             await manufacturerModel.create({ key, name })
        //         }
        //     }
        // }

        return { data, page, perPage, total };
    },
    async getRelatedProducts({ page = 1, perPage = 10, product = {} }) {
        const p = Math.max(parseInt(page), 1);
        const pp = parseInt(perPage);

        const cateKey = product?.category?.key;
        const manufacturerKey = product?.manufacturer?.key;
        const filter = {
            active: 1,
            _id: { $ne: product._id },
            $or: [
                { "category.key": cateKey },
                { "manufacturer.key": manufacturerKey },
            ],
        };

        const data = await productModel
            .find(filter)
            .skip(pp * p - pp)
            .limit(pp)
            .lean();
        const total = await productModel.countDocuments(filter);

        return { data, page, perPage, total };
    },

    /**
     *
     * @param {comment}
     * - userId
     * - content
     */
    async createCommentByProductId({ id = "", comment = {} }) {
        return await productModel.findByIdAndUpdate(id, {
            $push: { comments: comment },
        });
    },
    async getCategories() {
        return await categoryModel.find({}).lean();
    },
    async getCategoryByKey({ key }) {
        return await categoryModel.findOne({ key });
    },
    async getManufacturers() {
        return await manufacturerModel.find({}).lean();
    },
    async getManufacturerByKey({ key }) {
        return await manufacturerModel.findOne({ key });
    },
};

export default productService;
