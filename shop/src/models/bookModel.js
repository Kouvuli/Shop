import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        title: { type: Schema.Types.String },
        subtitle: { type: Schema.Types.String },
        isbn13: { type: Schema.Types.String },
        price: { type: Schema.Types.String },
        image: { type: Schema.Types.String },
        url: { type: Schema.Types.String },
    },
    { timestamps: true }
);

export default mongoose.model("books", schema);
