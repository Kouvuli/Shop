import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //name: Tên sản phẩm
        name: { type: Schema.Types.String, required: true },
        //description: Mô tả sản phẩm
        description: { type: Schema.Types.String, required: true },
        //category: Thông tin danh mục {type, ...}
        category: { type: Schema.Types.Object, },
        //manufacturer: thông tin về sản xuất sản phẩm {name. ...}
        manufacturer: { type: Schema.Types.Object },
        //quantity: Số lượng sản phẩm trong kho
        quantity: { type: Schema.Types.Number, required: true },
        //originPrice: giá nhập / sản phẩm
        originPrice: { type: Schema.Types.Number, required: true },
        //currentPrice: Giá bán hiện tại / sản phẩm
        currentPrice: { type: Schema.Types.Number, required: true },
        //images: mảng các ảnh của sản phẩm
        images: { type: Array },
        //comments: Danh sách bình luận của sản phẩm, mỗi comment {userId, content, createdAt}
        comments: { type: Array },
        active: { type: Number, default: 1 }

    },
    { timestamps: true }
);

export default mongoose.model("products", schema);
