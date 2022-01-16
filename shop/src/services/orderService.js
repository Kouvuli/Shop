import orderModel from "../models/orderModel";
import discountModel from "../models/discountModel";
import userModel from "../models/userModel";
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
    async createOrder({
        userId = "",
        products = [],
        address = "",
        status = "shipping",
        discounts = [],
        extra = {},
    }) {
        let totalCost = 0;
        for (const product of products) {
            totalCost +=
                parseFloat(product.price, 10) * parseInt(product.quantity, 10);
        }

        const newOrder = await orderModel.create({
            userId,
            products,
            address,
            status,
            discounts,
            totalCost,
            extra,
        });

        return newOrder;
    },

    async getOrdersByUserId({ userId = "", page = 1, perPage = 10 }) {
        const p = Math.max(parseInt(page), 1);
        const pp = parseInt(perPage);
        const origin = await orderModel
            .find({ userId })
            .skip(pp * p - pp)
            .limit(pp)
            .lean();

        const total = await orderModel.countDocuments({ userId });
        let data = [];
        for (const order of origin) {
            const { name } = await userModel.findById(order.userId);
            let discountPercent = 0;
            for (const discount of order.discounts) {
                const { value } = await discountModel.findById(discount);
                discountPercent += parseFloat(value);
            }

            let cost = 0;
            for (const product of order.products) {
                cost += parseFloat(product.price) * parseInt(product.quantity);
            }
            data.push({
                ...order,
                name,
                discount: (discountPercent * cost) / 100,
                cost,
            });
        }
        return { data, page, perPage, total };
    },
};

export default orderService;
