import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: String,
  price: {type:String, required:true},
  description: String,
  imageUrl: String,
  quantity: { type: Number, required: true }
});


export interface Product{
    id:string;
    title: string;
    price:string;
    description: string;
    imageUrl: string;
    quantity: number
}