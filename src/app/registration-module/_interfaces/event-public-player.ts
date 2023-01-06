import { EventPublicCity } from './event-public-city';
export interface EventPublicPlayer{
  id:number;
  name:string;
  birthday:string;
  fide_id?:number;
  cbx_id?:number;
  lbx_id?:number;
  chesscom_username?:string;
  lichess_username?:string;
  city_name:string;
  club_name?:string;

  city:EventPublicCity;
  club:EventPublicCity;

  can_register:boolean;
  register_status:boolean;
}
