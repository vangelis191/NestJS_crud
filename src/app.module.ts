import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonController } from './controllers/person.cotroller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonService } from './services/person.service';
import { PersonRepository } from './repository/person.repository';


@Module({
  imports: [],
  controllers: [AppController,PersonController],
  providers: [AppService, PersonService,PersonRepository],
})
export class AppModule {}
