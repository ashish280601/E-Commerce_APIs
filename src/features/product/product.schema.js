import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    typ: String,
  },
  sizes: {
    type: String,
  },
  inStock: Number,
  review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});
