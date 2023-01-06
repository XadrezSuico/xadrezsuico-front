import { EventPublicCountry } from './event-public-country';
export interface EventPublicState{
  id:number;
  name:string;
  slug:string;

  country_id:number;

  country?:EventPublicCountry;
}
