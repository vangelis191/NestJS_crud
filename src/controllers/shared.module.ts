import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from 'src/models/customer.model';
import { OrderSchema } from 'src/models/order.model';
import { ProductSchema } from 'src/models/product.model';
import { CustomerController } from './customer.controller';
import { OrderController } from './order.controller';
import { PersonController } from './person.controller';
import { PersonRepository } from 'src/repository/person.repository';
import { CustomerService } from 'src/services/customer.service';
import { OrderService } from 'src/services/order.service';
import { PersonService } from 'src/services/person.service';
import { ProductsService } from 'src/services/products.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Order', schema: OrderSchema },
    ]),
  ],


  controllers: [PersonController, ProductsController, OrderController, CustomerController],
  providers: [PersonService, PersonRepository, ProductsService, OrderService, CustomerService],

})
export class SharedModule {}
