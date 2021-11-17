import productModel from "../models/productModel"

const productService = {
    /**
     * 
     * @param {category}}
     * - type
     * - Các tường còn lại nếu có
     * @param {manufacturer}}
     * - name
     * - Các tường còn lại nếu có
     */
    async createProduct({ name = "", description = "", category = {}, manufacturer = {}, quantity = 0, originPrice = 0, currentPrice = 0, images = [] }) {
        return await productModel.create({ name, description, category, manufacturer, quantity, originPrice, currentPrice, images })
    },
    async updateProductById({ id = "", name = "", description = "", category = {}, manufacturer = {}, quantity = 0, originPrice = 0, currentPrice = 0, images = [] }) {
        return await productModel.findByIdAndUpdate(id, { name, description, category, manufacturer, quantity, originPrice, currentPrice, images })
    },
    async deleteProductById({ id = "" }) {
        return await productModel.findByIdAndUpdate(id, { active: 0 })
    },
    async getProductById({ id = "" }) {
        return await productModel.find({ _id: id, active: 1 }).lean()
    },
    async getProducts({ page = 1, perPage = 10, type = "" }) {
        let data = []
        let total = 0
        if (type) {
            data = await productModel.find({ active: 1, category: { type } }).skip((perPage * page) - perPage).limit(perPage).lean()
            total = await productModel.countDocuments({ active: 1, category: { type } })
        } else {
            data = await productModel.find({ active: 1 }).skip((perPage * page) - perPage).limit(perPage).lean()
            total = await productModel.countDocuments({ active: 1, category: { type } })
        }

        return { data, page, perPage, total }
    },
    async getTopSellers({ page = 1, perPage = 10, type = "" }) {
        let data = []
        let total = 0
        if (type) {
            data = await productModel.find({ active: 1, category: { type } }).skip((perPage * page) - perPage).limit(perPage).lean()
            total = await productModel.countDocuments({ active: 1, category: { type } })
        } else {
            data = await productModel.find({ active: 1 }).skip((perPage * page) - perPage).limit(perPage).lean()
            total = await productModel.countDocuments({ active: 1, category: { type } })
        }
        return { data, page, perPage, total }
    },
    /**
     * 
     * @param {comment}
     * - userId
     * - content 
     */
    async createCommentByProductId({ id = "", comment = {} }) {
        return await productModel.findByIdAndUpdate(id, { $push: { comments: comment } })
    }
}

export default productService