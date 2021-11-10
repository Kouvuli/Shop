import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        title: { type: Schema.Types.String },
        subtitle: { type: Schema.Types.String },
        authors: { type: Schema.Types.String },
        publisher: { type: Schema.Types.String },
        language: { type: Schema.Types.String },
        pages: { type: Schema.Types.String },
        year: { type: Schema.Types.String },
        rating: { type: Schema.Types.String },
        isbn13: { type: Schema.Types.String },
        price: { type: Schema.Types.String },
        image: { type: Schema.Types.String },
        url: { type: Schema.Types.String },
        desc: { type: Schema.Types.String },
        pdf: { type: Object }
    },
    { timestamps: true }
);

export default mongoose.model("bookDetails", schema);
