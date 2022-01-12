import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //userId: key để phân biệt các danh mục
        userId: { type: Schema.Types.String, required: true },
        //objectId: key để phân biệt các danh mục
        objectId: { type: Schema.Types.String, required: true },

        //action:view | cancel;
        action: { type: Schema.Types.String, required: true },
        //extra: dữ liệu thêm (serve for future)
        extra: { type: Schema.Types.Object, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("logs", schema);
