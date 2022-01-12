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

        const exist =
            cart.items.findIndex(
                (item) => item?.productId && item.productId === productId
            ) > -1;

        if (exist) {
            return cart;
        }
        if (cart == null) {
            // tao mot cart moi neu khong co user
            return await cartModel.create({ userId, items: [item] });
        } else {
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
};

export default cartService;
