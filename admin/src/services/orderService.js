import orderModel from "../models/orderModel";
import discountModel from "../models/discountModel";
import userModel from "../models/userModel";

const orderService = {
    async getOrders({ page = 1, perPage = 10 }) {
        const p = Math.max(parseInt(page), 1);
        const pp = parseInt(perPage);
        const origin = await orderModel
            .find({})
            .skip(pp * p - pp)
            .limit(pp)
            .lean();
        const total = await orderModel.countDocuments();
        let data = [];
        for (const order of origin) {
            const { name } = (await userModel.findById(order.userId)) || {};
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
    async getSales() {
        const origin = await orderModel.find({}).lean();
        let total = 0;
        for (const order of origin) {
            let cost = 0;
            for (const product of order.products) {
                cost += parseFloat(product.price) * parseInt(product.quantity);
            }
            total += cost;
        }
        return { total };
    },
};

export default orderService;
