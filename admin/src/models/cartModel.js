import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //sessionId: Đã đăng nhập ? id của user : id của session
        sessionId: { type: Schema.Types.ObjectId | Schema.Types.String },
        //items: Mảng các item, mỗi item có { productId, price, quantity}
        items: {
            type: Array
        },
    },
    { timestamps: true }
);

export default mongoose.model("carts", schema);
