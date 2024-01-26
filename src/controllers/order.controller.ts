import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Order } from 'src/models/order.model';
import { OrderService } from 'src/services/order.service';


@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() order: Order): Promise<Order> {
    try {
      return await this.orderService.create(order);
    } catch (error) {
      throw new HttpException('Failed to create order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(): Promise<Order[]> {
    try {
      return await this.orderService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch orders', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("order-product")
  async findOrderProduct(): Promise<Order[]> {
    return await this.orderService.findOrderProduct()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    try {
      return await this.orderService.findOne(id);
    } catch (error) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() order: Order): Promise<Order> {
    try {
      return await this.orderService.update(id, order);
    } catch (error) {
      throw new HttpException('Failed to update order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Order> {
    try {
      return await this.orderService.delete(id);
    } catch (error) {
      throw new HttpException('Failed to delete order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}