import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //userId: id của người dùng
        userId: { type: Schema.Types.String, required: true },
        //productId: id của người dùng
        productId: { type: Schema.Types.String, required: true },
        //name:tên danh mục
        content: { type: Schema.Types.String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("comment", schema);
