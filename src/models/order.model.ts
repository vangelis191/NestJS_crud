import * as mongoose from 'mongoose';
import { Product } from './product.model';
import { Customer } from './customer.model';

export const OrderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  orderDate: { type: Date, default: Date.now },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  status: String,
});

export interface Order extends mongoose.Document {
  id: string;
  customer: Customer;
  orderDate: Date;
  products: Product[];
  status: string;
 
}
