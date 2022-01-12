import mongoose from "mongoose";
const { Schema } = mongoose;
const schema = new Schema(
    {
        //userId: id của user
        userId: { type: Schema.Types.ObjectId, required: true },
        //products: Mảng các products, mỗi products có { price, quantity, productId}
        products: {
            type: Array,
        },
        //address: Địa chỉ giao hàng
        address: { type: Schema.Types.Object, required: true },
        //status: Đang chờ, đã giao,
        status: { type: Schema.Types.String, required: true },
        //shippedAt: Thời gian người dùng nhận hàng
        shippedAt: { type: Schema.Types.Date },
        //discounts: Danh sách các khuyến mãi được áp dụng, mỗi discount sẽ có {value:%, name}
        discounts: { type: Array },
        //totalCost: Tổng giá đơn hàng, không bị thay đổi sau khi đã mua
        totalCost: { type: Schema.Types.Number, required: true },

        //payment: Thông tin của giao dịch giao dịch, rỗng nếu chưa thanh toán {method, transactionId, createdAt, ...}
        payment: { type: Schema.Types.Object },
        extra: { type: Schema.Types.Object },
    },
    { timestamps: true }
);

export default mongoose.model("orders", schema);
