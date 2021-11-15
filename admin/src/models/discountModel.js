import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //name: Tên của đợt giảm giá
        name: { type: Schema.Types.String, required: true },
        //value: Phần trăm được giảm
        value: { type: Schema.Types.Number, required: true },
        //userId: ID của chủ sở hữu phiếu giảm giá, rỗng nếu giảm giá cho tất cả người dùng
        userId: { type: Schema.Types.String, required: true },

    },
    { timestamps: true }
);

export default mongoose.model("discounts", schema);
