import { EventPublicInfoTime } from "./event-public-info-time";

export interface EventPublicInfo{
  title:string;
  date:string;
  banner?:string;
  short_description?:string;
  long_description?:string;
  city:string;
  time_control:string;
  timeline?:Array<EventPublicInfoTime>;

  is_registering:boolean;
  registering_status:string;
}
