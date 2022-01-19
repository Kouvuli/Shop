import userModel from "../models/userModel";
import cartModel from "../models/cartModel";
import orderModel from "../models/orderModel";

import productModel from "../models/productModel";
import helpers from "../helper";
const cartService = {
    /**
     *
     * @param {items} Sản phẩm bao gồm
     * - quantity: Số lượng mua
     * - productId: ID của sản phẩm
     *
     */
    async addToCart({ userId = "", productId = " ", quantity = 1 }) {
        const cart = await cartModel.findOne({ userId }); //orderModel
        const item = {
            productId,
            quantity,
        };

        if (cart == null) {
            // tao mot cart moi neu khong co user
            return await cartModel.create({ userId, items: [item] });
        } else {
            const existIdx =
                cart.items.findIndex(
                    (item) => item?.productId && item.productId === productId
                ) > -1;

            if (existIdx) {
                const items = cart.items;
                items[existIdx].quantity = quantity;
                return await cartModel.findOneAndUpdate({ userId }, { items });
            }
            return await cartModel.findOneAndUpdate(
                { userId },
                { $push: { items: item } }
            ); //Them san pham vao
        }
    },

    async getCartByUserId({ userId = "" }) {
        const cart = (await cartModel.findOne({ userId }).lean()) || {};
        let userName = " ";
        if (helpers.isValidObjectId(userId)) {
            userName = (await userModel.findById(userId))?.name; //Neu khong co thi NULL
        }

        let cost = 0;
        let list = [];
        for (const item of cart.items || []) {
            const product = await productModel.findById(
                item?.productId || item?._id
            );
            if (product != null) {
                const totalPriceItem =
                    parseFloat(product.currentPrice) * parseInt(item.quantity);
                cost += totalPriceItem;
                list.push({
                    productId: item?.productId || item?._id,
                    name: product.name,
                    currentPrice: product.currentPrice,
                    quantity: item.quantity,
                    totalPrice: totalPriceItem,
                    img: product.images[0],
                });
            }
        }
        return { ...cart, userName, list, cost };
    },
    async setUserIdByCartId({ userId = "", cartId = "" }) {
        return await cartModel.findByIdAndUpdate(cartId, {
            $set: { userId },
        });
    },
    async deleteById(id) {
        return cartModel.deleteOne({ _id: id });
    },
    async updateItemCart({ userId, productId, quantity }) {
        const cart = await cartModel.findOne({ userId });
        const idx = cart.items.findIndex(
            (i) => i?.productId && i?.productId == productId
        );
        cart.items[idx].quantity = parseInt(quantity, 10);
        const newItems =
            parseInt(quantity, 10) === 0
                ? cart.items.filter((i, index) => index !== idx)
                : cart.items;
        return await cartModel.findByIdAndUpdate(cart?._id, {
            $set: { items: newItems },
        });
    },
};

export default cartService;
