
export class CarEntity {
    constructor(id:number, brand:string, year: number){
      this.id = id;
      this.brand = brand;
      this.year = year;
    }
    id: number;
    brand: string;
    year:number
}