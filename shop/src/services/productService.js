import _ from "lodash";
import productModel from "../models/productModel";
import categoryModel from "../models/categoryModel";
import manufacturerModel from "../models/manufacturerModel";
const productService = {
    async getProductById({ id = "" }) {
        return await productModel.findOne({ _id: id, active: 1 }).lean();
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

    async getTopSellers({ page = 1, perPage = 10, type = "" }) {
        const p = Math.max(parseInt(page), 1);
        const pp = parseInt(perPage)
        let data = [];
        let total = 0;
        if (type) {
            data = await productModel
                .find({ category: { type }, active: 1 })
                .skip(pp * p - pp)
                .limit(pp)
                .lean();
            total = await productModel.countDocuments({
                category: { type },
                active: 1,
            });
        } else {
            data = await productModel
                .find({ active: 1 })
                .skip(pp * p - pp)
                .limit(pp)
                .lean();
            total = await productModel.countDocuments({ active: 1 });
        }
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
