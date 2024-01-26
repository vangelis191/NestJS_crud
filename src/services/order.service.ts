import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/models/order.model';
import { Product } from 'src/models/product.model';


@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>,
  @InjectModel('Product') private readonly productModel: Model<Product>,) {}

  async create(orderDto: Order): Promise<Order> {
    try {
      const createdOrder = new this.orderModel(orderDto);
      return await createdOrder.save();
    } catch (error) {
      throw new Error('Failed to create order');
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.orderModel.find().exec();
    } catch (error) {
      throw new Error('Failed to fetch orders');
    }
  }


  async findOrderProduct(): Promise<Order[]> {
    try {
      const ordersWithProducts = await this.orderModel.aggregate([
        {
          $project: {
            customer: 1,
            orderDate: 1,
            status: 1,
            shippingAddress: 1,
            products: {
              $map: {
                input: '$products',
                as: 'productId',
                in: {
                  $toObjectId: '$$productId', 
                },
              },
            },
          },
        },
        {
          $lookup: {
            from: 'products', 
            localField: 'products', 
            foreignField: '_id', 
            as: 'productDetails', 
          },
        },
        {
          $addFields: {
            products: '$productDetails', 
          },
        },
        {
          $project: {
            productDetails: 0, 
          },
        },
      ]);

      return ordersWithProducts;
    } catch (error) {
      throw new Error('Failed to fetch orders with products');
    }
  }

  async findOne(id: string): Promise<Order> {
    try {
      return await this.orderModel.findById(id).exec();
    } catch (error) {
      throw new Error('Order not found');
    }
  }

  async update(id: string, orderDto: Order): Promise<Order> {
    try {
      return await this.orderModel.findByIdAndUpdate(id, orderDto, { new: true }).exec();
    } catch (error) {
      throw new Error('Failed to update order');
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      return await this.orderModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error('Failed to delete order');
    }
  }
}