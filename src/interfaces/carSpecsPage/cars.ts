export interface ICarVersion {
  id: number;
  version: string;
  year: number;
  horsepower: number;
  engine: number;
}

export interface ICarModel {
  id: number;
  name: string;
  collection: ICarVersion[];
}

export interface ICarBrand {
  id: number;
  brand: string;
  models: ICarModel[];
}

export type CarsArray = ICarBrand[];
