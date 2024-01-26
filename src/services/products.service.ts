import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async insertProduct(title: string, description: string, price: string) { 

    try {
      const product = new this.productModel({
        title,
        description,
        price,
      });
      return await  product.save();
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }
  async create(productDto: Product): Promise<Product> {
    try {
      const createdProduct = new this.productModel(productDto);
      return await createdProduct.save();
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productModel.find().exec();
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      return await this.productModel.findById(id).exec();
    } catch (error) {
      throw new Error('Product not found');
    }
  }

  async update(id: string, productDto: Product): Promise<Product> {
    try {
      return await this.productModel.findByIdAndUpdate(id, productDto, { new: true }).exec();
    } catch (error) {
      throw new Error('Failed to update product');
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      return await this.productModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }
}