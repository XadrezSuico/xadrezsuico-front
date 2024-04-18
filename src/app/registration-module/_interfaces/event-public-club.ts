import { EventPublicCity } from "./event-public-city";

export interface EventPublicClub{
  id:number;
  name:string;

  city_id:number;
  city?:EventPublicCity;
}
