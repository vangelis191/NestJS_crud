import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  NotFoundException,
  InternalServerErrorException,
  HttpCode,
} from '@nestjs/common';
import { CarEntity } from 'src/models/car.entity';
import { PeersonEntity } from 'src/models/person.entity';
import { PersonService } from 'src/services/person.service';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Get()
  getPersonCars(): PeersonEntity[] {
    return this.personService.getPersonCars();
  }

  @Delete(':name')
  @HttpCode(204)
  async deleteClient(@Param('name') name: string): Promise<void> {
    try {
      this.personService.deletePersonById(name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  @Get(':id')
  getPersonById(@Param('id') id: number) {
    try {
      return this.personService.getPersonById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  @Post()
  @HttpCode(201)
  createPerson(@Body()person:PeersonEntity){
    this.personService.createPerson(person)
  }
}
