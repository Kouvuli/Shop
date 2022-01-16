import orderModel from "../models/orderModel";
import discountModel from "../models/discountModel";
import userModel from "../models/userModel";

const orderService = {
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
