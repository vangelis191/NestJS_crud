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
  BadRequestException,
} from '@nestjs/common';
import { CarEntity } from 'src/models/car.entity';
import { PersonEntity } from 'src/models/person.entity';
import { PersonService } from 'src/services/person.service';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Get()
  async getPersonCars(): Promise<PersonEntity[]> {
    return await this.personService.getPersonCars();
  }

  @Delete(':name')
  @HttpCode(204)
  async deleteClient(@Param('name') name: string): Promise<void> {
    try {
      await this.personService.deletePersonById(name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  @Get(':id')
  async getPersonById(@Param('id') id: number) {
    try {
      return await this.personService.getPersonById(id);
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
  createPerson(@Body()person:PersonEntity){    
    if(Object.entries(person).length === 0){
      throw new BadRequestException('Object is required');
    }
    this.personService.createPerson(person)
    
  }
}
