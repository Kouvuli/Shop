import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //key: key để phân biệt các danh mục
        key: { type: Schema.Types.String, required: true },
        //name:tên danh mục
        name: { type: Schema.Types.String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("categories", schema);
