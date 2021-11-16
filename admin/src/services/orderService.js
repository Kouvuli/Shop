import orderModel from "../models/orderModel"
import discountModel from '../models/discountModel'
import userModel from "../models/userModel"

const orderService = {
    async getOrders() {
        const origin = await orderModel.find({})
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

            data.push({ ...order._doc, name, discount: discountPercent * cost, cost })
        }

        return data
    }
}


export default orderService