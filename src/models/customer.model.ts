import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: String,
  phone: String,
});

export interface Customer extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
}
