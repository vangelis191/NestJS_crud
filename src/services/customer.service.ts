import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/models/customer.model';


@Injectable()
export class CustomerService {
  constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {}

  async create(customerDto: Customer): Promise<Customer> {
    try {
      const createdCustomer = new this.customerModel(customerDto);
      return await createdCustomer.save();
    } catch (error) {
      throw new Error('Failed to create customer');
    }
  }

  async findAll(): Promise<Customer[]> {
    try {
      return await this.customerModel.find().exec();
    } catch (error) {
      throw new Error('Failed to fetch customers');
    }
  }

  async findOne(id: string): Promise<Customer> {
    try {
      return await this.customerModel.findById(id).exec();
    } catch (error) {
      throw new Error('Customer not found');
    }
  }

  async update(id: string, customerDto: Customer): Promise<Customer> {
    try {
      return await this.customerModel.findByIdAndUpdate(id, customerDto, { new: true }).exec();
    } catch (error) {
      throw new Error('Failed to update customer');
    }
  }

  async delete(id: string): Promise<Customer> {
    try {
      return await this.customerModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error('Failed to delete customer');
    }
  }
}