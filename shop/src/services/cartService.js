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
    async addToCart({ userId = "", item = {} }) {
        const cart = await orderModel.findOne({ userId })
        if (cart == null) {
            return await cartModel.create({ userId, items: [item] })
        } else {
            return await cartModel.findOneAndUpdate({ userId }, { $push: { items: item } })
        }
    },

    async getCartByUserId({ userId = "" }) {
        const cart = await cartModel.findOne({ userId }).lean() ||{}
        const { name: userName } = await userModel.findById(userId)

        let cost = 0
        let list=[]
        for (const item of (cart.items||[])) {
            const product = await productModel.findById(item.productId)            
            const totalPriceItem= parseFloat(product.currentPrice) * parseInt(item.quantity)
            cost += totalPriceItem
            list.push({name: product.name, currentPrice: product.currentPrice, quantity: item.quantity, totalPrice:totalPriceItem, img: product.images[0]})
        }
        return { ...cart, userName, list, cost}
    },

}

export default cartService