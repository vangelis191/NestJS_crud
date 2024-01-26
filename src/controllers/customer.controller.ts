import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Customer } from 'src/models/customer.model';
import { CustomerService } from 'src/services/customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() customer: Customer): Promise<Customer> {
    try {
      return await this.customerService.create(customer);
    } catch (error) {
      throw new HttpException('Failed to create customer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(): Promise<Customer[]> {
    try {
      return await this.customerService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch customers', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    try {
      return await this.customerService.findOne(id);
    } catch (error) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() customer: Customer): Promise<Customer> {
    try {
      return await this.customerService.update(id, customer);
    } catch (error) {
      throw new HttpException('Failed to update customer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Customer> {
    try {
      return await this.customerService.delete(id);
    } catch (error) {
      throw new HttpException('Failed to delete customer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}