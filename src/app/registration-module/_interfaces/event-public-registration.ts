import { EventPublicPaymentInfo } from './event-public-payment-info';
import { EventPublicLbxInfo } from './event-public-lbx-info';
import { EventPublicFideInfo } from './event-public-fide-info';
import { EventPublicChessComInfo } from './event-public-chess-com-info';
import { EventPublicLichessInfo } from './event-public-lichess-info';
import { EventPublicClub } from './event-public-club';
import { EventPublicCity } from 'src/app/registration-module/_interfaces/event-public-city';
import { EventPublicCategory } from 'src/app/registration-module/_interfaces/event-public-category';
import { EventPublicPlayer } from 'src/app/registration-module/_interfaces/event-public-player';
import { EventPublicCbxInfo } from './event-public-cbx-info';
import { CustomField } from 'src/app/_intefaces/custom-field';
export interface EventPublicRegistration{
  uuid:string;
  player?:EventPublicPlayer;
  category?:EventPublicCategory;

  city_name:string;
  club_name?:string;

  city:EventPublicCity;
  club?:EventPublicClub;

  lichess_info?:EventPublicLichessInfo;
  chess_com_info?:EventPublicChessComInfo;

  rating?:number;

  fide_info?:EventPublicFideInfo;
  cbx_info?:EventPublicCbxInfo;
  lbx_info?:EventPublicLbxInfo;

  payment_info?:EventPublicPaymentInfo;

  custom_fields?:Array<CustomField>;
}
