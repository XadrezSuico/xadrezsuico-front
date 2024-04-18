import { City } from './city';
export interface Club{
  id:number;
  name:string;

  city_id?:number;
  city?:City;
}
