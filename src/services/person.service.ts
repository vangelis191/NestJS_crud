import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PersonEntity } from 'src/models/person.entity';
import { PersonRepository } from 'src/repository/person.repository';

@Injectable()
export class PersonService {
  constructor(private personRepository: PersonRepository) {}

  async getPersonCars(): Promise<PersonEntity[]>{
    return await this.personRepository.getPersonCars();
  }

  async getPersonById(id: number): Promise<PersonEntity[]> {
    const data = await this.personRepository.getPersonById(id);
    if (data.length <= 0) {
      throw new NotFoundException(`Data with ID ${id} not found`);
    }
    return this.personRepository.getPersonById(id);
  }

   deletePersonById(name: string) {
    try {
        this.personRepository.deletePersonById(name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  createPerson(person:PersonEntity){
        this.personRepository.createPerson(person)
   }
}
