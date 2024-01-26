import * as mongoose from 'mongoose';
import { Product } from './product.model';
import { Customer } from './customer.model';

export const OrderSchema = new mongoose.Schema({
  customer: String,
  orderDate: { type: Date, default: Date.now },
  products: [String],
  status: String,
  shippingAddress:String
});

export interface Order extends mongoose.Document {
  id: string;
  customer: string;
  orderDate: Date;
  products: string[];
  status: string;
  shippingAddress:string
 
}
