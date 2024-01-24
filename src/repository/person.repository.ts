import { Injectable, NotFoundException } from '@nestjs/common';
import { CarEntity } from 'src/models/car.entity';
import { PeersonEntity } from 'src/models/person.entity';
import { v4 as uuidv4 } from 'uuid';
const person1 = new PeersonEntity();
person1.id = 1;
person1.name = 'Vangelis';
person1.cars = [
  new CarEntity(uuidv4(), 'BMW', 20230),
  new CarEntity(uuidv4(), 'Honda', 2000),
];

const person2 = new PeersonEntity();
person2.id = 2;
person2.name = 'Marios';
person2.cars = [
  new CarEntity(uuidv4(), 'Nissan', 20230),
  new CarEntity(uuidv4(), 'Kia', 2000),
];

const persons = [];
persons.push(person1);
persons.push(person2);

@Injectable()
export class PersonRepository {
  getPersonCars(): PeersonEntity[] {
    return persons;
  }

  getPersonById(id: number) {
    return persons.filter((res) => res.id == id);
  }

  deletePersonById(name: string) {
    let personToDelete = persons.findIndex((res) => res.name == name);
    if (personToDelete == -1)
      throw new NotFoundException(`Data with Name ${name} not found`);
    persons.splice(personToDelete, 1);
  }

  createPerson(person: PeersonEntity) {
    persons.push({
      id: persons.length + 1,
      ...person,
      cars: [
        person.cars.map((car) => {
          const myUuid = uuidv4();
          return {
            id: myUuid,
            ...car,
          };
        }),
      ],
    });
  }
}
