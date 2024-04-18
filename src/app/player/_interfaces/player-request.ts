import { PlayerDocumentType } from './player-document-type';
import { PlayerCountry } from './player-country';
import { PlayerCity } from './player-city';
import { Player } from './player';
import { PlayerState } from './player-state';
export interface PlayerRequest{
  ok:number;
  error:number;
  message?:string;

  result?:boolean;

  player?:Player;
  players?:Array<Player>;

  city?:PlayerCity;
  cities?:Array<PlayerCity>;

  state?:PlayerState;
  states?:Array<PlayerState>;

  country?:PlayerCountry;
  contries?:Array<PlayerCountry>;

  document_type?:PlayerDocumentType;
  document_types?:Array<PlayerDocumentType>;
}
