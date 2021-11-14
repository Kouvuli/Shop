import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //name: Tên người dùng
        name: { type: Schema.Types.String, required: true },
        //username: Tên dùng để đăng nhập
        username: { type: Schema.Types.String, required: true },
        //password: mật khẩu đã được hash của người dùng
        password: { type: Schema.Types.String, required: true },
        //email: email của người dùng
        email: { type: Schema.Types.String, required: true },
        //address: địa chỉ của người dùng (chưa chắc là địa chỉ giao hàng)
        address: { type: Schema.Types.String },
        //birthday: sinh nhật người dùng
        birthday: { type: Schema.Types.String },
    },
    { timestamps: true }
);

export default mongoose.model("users", schema);
