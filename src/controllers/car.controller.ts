import { Controller, Get } from '@nestjs/common';
import { CarEntity } from 'src/models/car.entity';


@Controller('car')
export class CarController {
  
  @Get()
  findAll(): CarEntity {
    return null;
  }

  
}