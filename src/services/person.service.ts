import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PeersonEntity } from 'src/models/person.entity';
import { PersonRepository } from 'src/repository/person.repository';

@Injectable()
export class PersonService {
  constructor(private personRepository: PersonRepository) {}

  getPersonCars(): PeersonEntity[] {
    return this.personRepository.getPersonCars();
  }

  getPersonById(id: number) {
    const data = this.personRepository.getPersonById(id);
    if (data.length <= 0) {
      throw new NotFoundException(`Data with ID ${id} not found`);
    }
    return this.personRepository.getPersonById(id);
  }

  deletePersonById(name: string) {
    try {
      return this.personRepository.deletePersonById(name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  createPerson(person:PeersonEntity){
        this.personRepository.createPerson(person)
   }
}
