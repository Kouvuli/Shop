import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //sessionId: Đã đăng nhập ? id của user : id của session
        userId: { type: Schema.Types.ObjectId, required: true },
        //items: Mảng các item, mỗi item có { productId, quantity, createdAt}
        items: {
            type: Array
        },
    },
    { timestamps: true }
);

export default mongoose.model("carts", schema);
