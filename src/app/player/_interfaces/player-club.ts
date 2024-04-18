import { PlayerCity } from './player-city';
export interface PlayerClub{
  id:number;
  name:string;

  city_id?:number;
  city?:PlayerCity;
}
