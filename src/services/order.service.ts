import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/models/order.model';


@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}

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