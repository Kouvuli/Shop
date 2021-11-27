import _ from "lodash"
import helpers from "../helpers"
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
        const manufacturerKey = helpers.slug(manufacturer.name)
        const typeKey = helpers.slug(category.type)
        return await productModel.create({ name, description, category: { ...category, key: typeKey }, manufacturer: { ...manufacturer, key: manufacturerKey }, quantity, originPrice, currentPrice, images })
    },
    async updateProductById({ id = "", name = "", description = "", category = {}, manufacturer = {}, quantity = 0, originPrice = 0, currentPrice = 0, images = [] }) {
        const manufacturerKey = helpers.slug(manufacturer.name)
        const typeKey = helpers.slug(category.type)
        return await productModel.findByIdAndUpdate(id, { name, description, category: { ...category, key: typeKey }, manufacturer: { ...manufacturer, key: manufacturerKey }, quantity, originPrice, currentPrice, images })
    },
    async deleteProductById({ id = "" }) {
        return await productModel.findByIdAndUpdate(id, { active: 0 })
    },
    async getProductById({ id = "" }) {
        return await productModel.findOne({ _id: id, active: 1 }).lean()
    },
    async getProducts({ q = "", page = 1, perPage = 10, type = "", manufacturerName = "" }) {
        const p = Math.max(parseInt(page), 1)
        const pp = Math.max(parseInt(perPage), 10)
        const filter = { active: 1 }
        const manufacturerKey = helpers.slug(manufacturerName)
        const typeKey = helpers.slug(type)
        if (!_.isEmpty(manufacturerKey)) {
            filter['manufacturer.key'] = manufacturerKey
        }
        if (!_.isEmpty(typeKey)) {
            filter['category.key'] = typeKey
        }
        if (_.isEmpty(q)) {
            filter['$or'] = [{ name: { $regex: q } },
            { 'category.type': { $regex: q } },
            { 'manufacturer.name': { $regex: q } }]
        }
        const data = await productModel.find(filter)
            .skip((pp * p) - pp)
            .limit(pp)
            .lean()
        const total = productModel.countDocuments(filter)
        return { data, page, perPage, total, type, manufacturerName }
    },

    async getTopSellers({ page = 1, perPage = 10, type = "" }) {
        const p = Math.max(parseInt(page), 1)
        const pp = Math.max(parseInt(perPage), 10)
        let data = []
        let total = 0
        if (type) {
            data = await productModel.find({ category: { type }, active: 1 }).skip((pp * p) - pp).limit(pp).lean()
            total = await productModel.countDocuments({ category: { type }, active: 1 })
        } else {
            data = await productModel.find({ active: 1 }).skip((pp * p) - pp).limit(pp).lean()
            total = await productModel.countDocuments({ active: 1 })
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