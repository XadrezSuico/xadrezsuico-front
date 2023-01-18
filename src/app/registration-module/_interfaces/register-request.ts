import { EventPublicDocumentType } from './event-public-document-type';
import { EventPublicClub } from './event-public-club';
import { EventPublicCity } from './event-public-city';
import { EventPublicPlayer } from './event-public-player';
import { EventPublic } from './event-public';
import { EventPublicCategory } from './event-public-category';
import { EventPublicCountry } from './event-public-country';
import { EventPublicState } from './event-public-state';
import { EventPublicSex } from './event-public-sex';
import { EventPublicRegistration } from './event-public-registration';
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

  sexes?:Array<EventPublicSex>;
  sex?:EventPublicSex;

  document_types?:Array<EventPublicDocumentType>;
  document_type?:EventPublicDocumentType;

  registrations?:Array<EventPublicRegistration>;
  registration?:EventPublicRegistration;

  httpcode?:number;
  result?:boolean;
  response?:boolean;
  link?:string;
}
