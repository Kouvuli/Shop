import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //name: Tên sản phẩm
        name: { type: Schema.Types.String },
        //description: Mô tả sản phẩm
        description: { type: Schema.Types.String },
        //category: Thông tin danh mục
        category: { type: Object },
        //manufacturer: thông tin về sản xuất sản phẩm
        manufacturer: { type: Object },
        //quantity: Số lượng sản phẩm trong kho
        quantity: { type: Schema.Types.Number },
        //originPrice: giá nhập / sản phẩm
        originPrice: { type: Schema.Types.Number },
        //currentPrice: Giá bán hiện tại / sản phẩm
        currentPrice: { type: Schema.Types.Number },
        //images: mảng các ảnh của sản phẩm
        images: { type: Array < String > [] },
        //comments: Danh sách bình luận của sản phẩm, mỗi comment {userId, content}
        comments: { type: Array < Object > [] },

    },
    { timestamps: true }
);

export default mongoose.model("products", schema);
