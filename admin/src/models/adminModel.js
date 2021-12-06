import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //name: Tên admin
        name: { type: Schema.Types.String, required: true },
        //avatar: Ảnh đại diện của admin
        avatar: { type: Schema.Types.String },
        //username: Tên dùng để đăng nhập
        username: { type: Schema.Types.String, required: true, unique: true },
        //password: mật khẩu đã được hash của admin
        password: { type: Schema.Types.String, required: true },
        //email: email của admin
        email: { type: Schema.Types.String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("admins", schema);
