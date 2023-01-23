import { PlayerCountry } from "./player-country";

export interface PlayerState{
  id:number;
  name:string;
  slug:string;

  country_id:number;

  country?:PlayerCountry;
}
