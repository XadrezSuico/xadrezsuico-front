import { PlayerCity } from "./player-city";
import { PlayerClub } from "./player-club";

export interface Player{
  id:number;
  name:string;
  birthday:string;
  city_name:string;
  club_name?:string;

  city?:PlayerCity;
  club?:PlayerClub;

  fide_id?:number;
  cbx_id?:number;
  lbx_id?:number;
  chesscom_username?:string;
  lichess_username?:string;

  can_register?:boolean;
  register_status?:boolean;
}
