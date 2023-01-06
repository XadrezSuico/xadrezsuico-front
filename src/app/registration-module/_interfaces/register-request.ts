import { EventPublicClub } from './event-public-club';
import { EventPublicCity } from './event-public-city';
import { EventPublicPlayer } from './event-public-player';
import { EventPublic } from './event-public';
import { EventPublicCategory } from './event-public-category';
import { EventPublicCountry } from './event-public-country';
import { EventPublicState } from './event-public-state';
export interface RegisterRequest{
  ok:number;
  error:number;
  message?:string;

  event?:EventPublic;

  player?:EventPublicPlayer;
  players?:Array<EventPublicPlayer>;

  categories?:Array<EventPublicCategory>;

  countries?:Array<EventPublicCountry>;
  country?:EventPublicCountry;

  states?:Array<EventPublicState>;
  state?:EventPublicState;

  cities?:Array<EventPublicCity>;
  city?:EventPublicCity;

  clubs?:Array<EventPublicClub>;
  club?:EventPublicClub;

  httpcode?:number;
  result?:boolean;
}
