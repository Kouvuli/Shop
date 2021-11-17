import discountModel from "../models/discountModel"
const discountService = {

    async createDiscount({ name = "", value = 0, userId = "", expiry = null }) {
        return await discountModel.create({ name, value, userId, expiry })
    },
    async getDiscountById({ id = "" }) {
        return await discountModel.find({ _id: id })
    },
    async getDiscounts({ page = 1, perPage = 10 }) {
        const data = await discountModel.find().skip((perPage * page) - perPage).limit(perPage)
        const total = await discountModel.countDocuments()
        return { data, page, perPage, total }
    },
    async getDiscountsByUserId({ userId = "", page = 1, perPage = 10 }) {
        const data = await discountModel.find({ $or: [{ userId }, { userId: "" }], expiry: { $lte: new Date() } }).skip((perPage * page) - perPage).limit(perPage)
        const total = await discountModel.countDocuments({ $or: [{ userId }, { userId: "" }], expiry: { $lte: new Date() } })
        return { data, page, perPage, total }
    },
}

export default discountService