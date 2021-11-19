import _ from "lodash"
import discountModel from "../models/discountModel"
import userModel from "../models/userModel"
const discountService = {

    async createDiscount({ name = "", value = 0, userId = "", expiry = null }) {
        return await discountModel.create({ name, value, userId, expiry })
    },
    async getDiscountById({ id = "" }) {
        return await discountModel.findById(id).lean()
    },
    async getDiscounts({ page = 1, perPage = 10 }) {
        const p = parseInt(page)
        const pp = parseInt(perPage)
        let data = []
        const discounts = await discountModel.find().skip((pp * p) - pp).limit(pp).lean()

        for (const discount of discounts) {
            let userName = "Mọi người"

            if (!_.isEmpty(discount.userId)) {
                const user = await userModel.findById(discount.userId)
                if (user !== null) {
                    userName = user.name
                }
            }

            data.push({ ...discount, userName })
        }

        const total = await discountModel.countDocuments()
        return { data, page, perPage, total }
    },
    async getDiscountsByUserId({ userId = "", page = 1, perPage = 10 }) {
        const p = parseInt(page)
        const pp = parseInt(perPage)
        const data = await discountModel.find({ $or: [{ userId }, { userId: "" }], expiry: { $lte: new Date() } }).skip((pp * p) - pp).limit(pp).lean()
        const total = await discountModel.countDocuments({ $or: [{ userId }, { userId: "" }], expiry: { $lte: new Date() } })
        return { data, page, perPage, total }
    },
}

export default discountService