import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  rf_id: { type: String, required: true, unique: true },
  product_name: { type: String, required: true },
  price: { type: Number, required: true }
});

export const Product = model('Product', ProductSchema);
