import { EventPublicLimit } from './event-public-limit';
import { CustomField } from "src/app/_intefaces/custom-field";
import { EventPublicInfoTime } from "./event-public-info-time";

export interface EventPublicInfo{
  title:string;
  date:string;
  banner?:string;
  short_description?:string;
  long_description?:string;
  city:string;
  place:string;
  time_control:string;
  timeline?:Array<EventPublicInfoTime>;

  link:string;

  is_registering:boolean;
  registering_status:string;

  is_paid:boolean;

  is_lichess:boolean;
  is_lichess_integration:boolean;

  is_chess_com:boolean;

  is_xadrezsuico_rating:boolean;

  is_use_fide:boolean;
  is_use_cbx:boolean;
  is_use_lbx:boolean;

  custom_fields:Array<CustomField>;

  limits?:EventPublicLimit;
}
