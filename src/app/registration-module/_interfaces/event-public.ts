import { EventPublicCategory } from './event-public-category';
import { EventPublicInfo } from "./event-public-info";

export interface EventPublic{
  uuid?:string;
  info:EventPublicInfo;
  tabs:Array<string>;
  categories:Array<EventPublicCategory>;
}
