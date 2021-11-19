import userModel from "../models/userModel"
import cartModel from '../models/cartModel'
import productModel from "../models/productModel"
const cartService = {
    /**
     * 
     * @param {items} Sản phẩm bao gồm 
     * - quantity: Số lượng mua
     * - productId: ID của sản phẩm
     * 
     */
    async addToCard({ userId = "", item = {} }) {
        const cart = await orderModel.findOne({ userId })
        if (cart == null) {
            return await cartModel.create({ userId, items: [item] })
        } else {
            return await cartModel.findOneAndUpdate({ userId }, { $push: { items: item } })
        }
    },



    async getCardByUserId({ userId = "" }) {
        const cart = await cartModel.findOne({ userId })
        const { name } = await userModel.findById(userId)

        let cost = 0
        for (const item of cart.products) {
            const product = await productModel.findById(item.productId)
            cost += parseFloat(product.currentPrice) * parseInt(item.quantity)
        }
        return { ...cart._doc, name, cost }
    },

}


export default cartService