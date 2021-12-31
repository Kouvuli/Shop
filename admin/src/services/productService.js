import _ from "lodash"
import helpers from "../helpers"
import productModel from "../models/productModel"
import categoryModel from "../models/categoryModel"
import manufacturerModel from "../models/manufacturerModel"
import orderModel from '../models/orderModel'
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
        const cateKey = helpers.slug(category.type)

        const cate = await categoryModel.findOne({ key: cateKey })
        if (!cate) {
            await categoryModel.create({ key: cateKey, name: category.type })
        }
        const manu = await manufacturerModel.findOne({ key: manufacturerKey })
        if (!manu) {
            await manufacturerModel.create({ key: manufacturerKey, name: manufacturer.name })
        }
        return await productModel.create({ name, description, category: { ...category, key: typeKey }, manufacturer: { ...manufacturer, key: cateKey }, quantity, originPrice, currentPrice, images })
    },
    async updateProductById({ id = "", name = "", description = "", category = {}, manufacturer = {}, quantity = 0, originPrice = 0, currentPrice = 0, images = [] }) {
        const manufacturerKey = helpers.slug(manufacturer.name)
        const cateKey = helpers.slug(category.type)

        const cate = await categoryModel.findOne({ key: cateKey })
        if (!cate) {
            await categoryModel.create({ key: cateKey, name: category.type })
        }
        const manu = await manufacturerModel.findOne({ key: manufacturerKey })
        if (!manu) {
            await manufacturerModel.create({ key: manufacturerKey, name: manufacturer.name })
        }
        return await productModel.findByIdAndUpdate(id, { name, description, category: { ...category, key: cateKey }, manufacturer: { ...manufacturer, key: manufacturerKey }, quantity, originPrice, currentPrice, images })
    },
    async deleteProductById({ id = "" }) {
        return await productModel.findByIdAndUpdate(id, { active: 0 })
    },
    async getProductById({ id = "" }) {
        return await productModel.findOne({ _id: id, active: 1 }).lean()
    },
    async getProducts({ q = "", page = 1, perPage = 10, type = "", manufacturerName = "" }) {
        const p = Math.max(parseInt(page), 1)
        const pp = parseInt(perPage)
        const filter = { active: 1 }
        const manufacturerKey = helpers.slug(manufacturerName)
        const typeKey = helpers.slug(type)


        if (!_.isEmpty(manufacturerKey)) {
            filter['manufacturer.key'] = manufacturerKey
        }
        if (!_.isEmpty(typeKey)) {
            filter['category.key'] = typeKey
        }
        if (!_.isEmpty(q)) {
            filter['$or'] = [{ name: { $regex: q } },
            { 'category.type': { $regex: q } },
            { 'manufacturer.name': { $regex: q } }]
        }
        const data = await productModel.find(filter)
            .skip((pp * p) - pp)
            .limit(pp)
            .lean()
        const total = await productModel.countDocuments(filter)
        return { data, page, perPage, total, type, manufacturerName }
    },

    async getTopSellers({ perPage = 10 }) {
        const orders = await orderModel.find({}).lean()
        const soldProducts = orders.map(order => order.products).flat()

        const sumById = soldProducts.reduce((acc, val) => {
            acc[val.productId] = acc[val.productId] === undefined ? val.quantity : acc[val.productId] += val.quantity;
            return acc;
        }, {});

        let list = []

        for (const key of Object.keys(sumById)) {
            const product = await productModel.findById(key).lean()
            list.push({ ...product, sold: sumById[key] })
        }
        const data = list.sort((p, n) => (n.sold - p.sold)).slice(0, parseInt(perPage, 10))
        return { data, perPage }
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