import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonService } from './services/person.service';
import { PersonRepository } from './repository/person.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './services/products.service';
import { OrderService } from './services/order.service';
import { CustomerService } from './services/customer.service';
import { SharedModule } from './controllers/shared.module';



@Module({
  imports: [
  MongooseModule.forRoot('mongodb+srv://vangelis191:F7PegDHfq3Umbipa@cluster0.lszw8jp.mongodb.net/test?retryWrites=true&w=majority'),
  SharedModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
