import { Controller, Get } from '@nestjs/common';
import { CarEntity } from 'src/models/car.entity';
import { PeersonEntity } from 'src/models/person.entity';

@Controller('car')
export class CarController {
  
  @Get()
  findAll(): CarEntity {
    return null;
  }

  
}