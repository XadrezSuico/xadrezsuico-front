import { EventPublicClub } from './event-public-club';
import { EventPublicCity } from './event-public-city';
export interface EventPublicPlayer{
  id:number;
  name:string;
  birthday:string;
  city_name:string;
  club_name?:string;

  city?:EventPublicCity;
  club?:EventPublicClub;

  born_country_id?:number;

  fide_id?:number;
  cbx_id?:number;
  lbx_id?:number;
  chesscom_username?:string;
  lichess_username?:string;

  can_register?:boolean;
  register_status?:boolean;
}
