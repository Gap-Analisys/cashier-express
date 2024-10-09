import { Schema, model } from 'mongoose';

const TransactionSchema = new Schema({
  qr_code: { type: String, required: true },
  rf_id: { type: String, required: true },
  price: { type: Number, required: true },
  total_price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export const Transaction = model('Transaction', TransactionSchema);
