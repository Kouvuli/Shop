import mongoose from "mongoose";
const { Schema } = mongoose;
const schema = new Schema(
    {
        //userId: id của user
        userId: { type: Schema.Types.ObjectId },
        //products: Mảng các products, mỗi products có { price, quantity, discount}
        products: {
            type: Array < Object > []
        },
        //address: Địa chỉ giao hàng
        address: { type: Schema.Types.String },
        //status: Đang chờ, đã giao
        status: { type: 'pending' | 'shipped' },
        //shippedAt: Thời gian người dùng nhận hàng
        shippedAt: { type: Schema.Types.Date },
        //totalCost: Tổng giá đơn hàng, không bị thay đổi sau khi đã mua
        totalCost: { type: Schema.Types.Number },
        //discounts: Danh sách các khuyến mãi được áp dụng
        discounts: { type: Array < Object > [] },
        //payment: Thông tin của giao dịch giao dịch, rỗng nếu chưa thanh toán
        payment: { type: Schema.Types.Object }

    },
    { timestamps: true }
);

export default mongoose.model("orders", schema);
