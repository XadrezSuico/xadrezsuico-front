import { Club } from './player-club';
import { City } from "./city";
import { Country } from "./country";
import { XadrezSuicoDefault } from "./default";
import { State } from "./player-state";

export interface XadrezSuicoRequest{
  ok:number;
  error:number;
  message?:string;
  defaults?:XadrezSuicoDefault;

  city?:City;
  cities?:Array<City>;

  state?:State;
  states?:Array<State>;

  country?:Country;
  contries?:Array<Country>;

  club?:Club;
  clubs?:Array<Club>;
}
