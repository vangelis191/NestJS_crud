import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
import { Product } from 'src/models/product.model';
import { ProductsService } from 'src/services/products.service';
  

  
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    // @Post()
    // async addProduct(
    //   @Body('title') title: string,
    //   @Body('description') descr: string,
    //   @Body('price') price: string,
    // ) {
    //   const generatedId = await this.productsService.insertProduct(
    //     title,
    //     descr,
    //     price,
    //   );
    //   return { id: generatedId };
    // }

    @Post()
    async create(@Body() product: Product): Promise<Product> {
      try {
        return await this.productsService.create(product);
      } catch (error) {
        throw new HttpException('Failed to create product', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
  @Get()
  async findAll(): Promise<Product[]> {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    try {
      return await this.productsService.update(id, product);
    } catch (error) {
      throw new HttpException('Failed to update product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    try {
      return await this.productsService.delete(id);
    } catch (error) {
      throw new HttpException('Failed to delete product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}