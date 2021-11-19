import orderModel from "../models/orderModel"
import discountModel from '../models/discountModel'
import userModel from "../models/userModel"

const orderService = {
    /**
     * 
     * @param {products} Mảng các sản phẩm, mỗi sản phẩm bao gồm 
     * - price: Giá bán 1 sản phẩm tại thời điểm này
     * - quantity: Số lượng mua
     * - productId: ID của sản phẩm
     * @param {status} shipping | shipped | processing
     * @param {discounts} Mảng các ID của discount
     * 
     */
    async createOrder({ userId = "", products = [], address = "", status = "shipping", discounts = [] }) {
        let discountPercent = 0
        for (const discount of order.discounts) {
            const { value } = await discountModel.findById(discount)
            discountPercent += parseFloat(value)
        }

        let cost = 0
        for (const product of order.products) {
            cost += parseFloat(product.price) * parseInt(product.quantity)
        }

        const totalCost = cost - discountPercent * cost / 100
        const newOrder = await orderModel.create({ userId, products, address, status, discounts, totalCost })

        return newOrder
    },
    /**
     * 
     * @param {payment} 
     * - method: crash | credit
     * - transactionId: 
     * - Các tường còn lại nếu có
     */
    async updatePaymentById({ id = "", payment = {} }) {
        return await orderModel.findByIdAndUpdate(id, { payment: { ...payment, createdAt: new Date() } })
    },
    /**
     * 
     * @param {date} Ngày giao 
     * @returns 
     */
    async updateShippedById({ id = "", date = new Date() }) {
        return await orderModel.findByIdAndUpdate(id, { shippedAt: new Date(date), status: "shipped" })
    },
    async getOrders({ page = 1, perPage = 10 }) {
        const p = parseInt(page)
        const pp = parseInt(perPage)
        console.log({ p, pp });

        const origin = await orderModel.find({}).skip((pp * p) - pp).limit(pp).lean()
        const total = await orderModel.countDocuments()
        let data = []
        for (const order of origin) {
            const { name } = await userModel.findById(order.userId)
            let discountPercent = 0
            for (const discount of order.discounts) {
                const { value } = await discountModel.findById(discount)
                discountPercent += parseFloat(value)
            }

            let cost = 0
            for (const product of order.products) {
                cost += parseFloat(product.price) * parseInt(product.quantity)
            }
            data.push({ ...order, name, discount: discountPercent * cost / 100, cost })
        }
        return { data, page, perPage, total }
    },
    async getOrdersByUserId({ userId = "", page = 1, perPage = 10 }) {
        const p = parseInt(page)
        const pp = parseInt(perPage)
        const origin = await orderModel.findOne({ userId }).skip((pp * p) - pp).limit(pp).lean()
        const total = await orderModel.countDocuments({ userId })
        let data = []
        for (const order of origin) {
            const { name } = await userModel.findById(order.userId)
            let discountPercent = 0
            for (const discount of order.discounts) {
                const { value } = await discountModel.findById(discount)
                discountPercent += parseFloat(value)
            }

            let cost = 0
            for (const product of order.products) {
                cost += parseFloat(product.price) * parseInt(product.quantity)
            }
            data.push({ ...order, name, discount: discountPercent * cost / 100, cost })
        }
        return { data, page, perPage, total }
    },
    async getOrderById({ id = "" }) {
        const order = await orderModel.findById(id)
        const { name } = await userModel.findById(order.userId)
        let discountPercent = 0
        for (const discount of order.discounts) {
            const { value } = await discountModel.findById(discount)
            discountPercent += parseFloat(value)
        }
        let cost = 0
        for (const product of order.products) {
            cost += parseFloat(product.price) * parseInt(product.quantity)
        }
        return { ...order._doc, name, discount: discountPercent * cost / 100, cost }
    },

}


export default orderService