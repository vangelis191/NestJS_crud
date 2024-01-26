import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonController } from './controllers/person.cotroller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonService } from './services/person.service';
import { PersonRepository } from './repository/person.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './models/product.model';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { OrderService } from './services/order.service';
import { CustomerService } from './services/customer.service';
import { CustomerSchema } from './models/customer.model';
import { OrderSchema } from './models/order.model';



@Module({
  imports: [
  MongooseModule.forRoot('mongodb+srv://vangelis191:Gold2023@cluster0.lszw8jp.mongodb.net/test?retryWrites=true&w=majority'),
  MongooseModule.forFeature([
    { name: 'Product', schema: ProductSchema },
    { name: 'Customer', schema: CustomerSchema },
    { name: 'Order', schema: OrderSchema },
  ]),
],
  controllers: [AppController,PersonController,ProductsController],
  providers: [AppService, PersonService,PersonRepository,ProductsService,OrderService,CustomerService],
})
export class AppModule {}
