import { EventPublicPlayer } from './event-public-player';
import { EventPublic } from './event-public';
export interface RegisterRequest{
  ok:number;
  error:number;
  message?:string;
  event?:EventPublic;
  player?:EventPublicPlayer;
  players?:Array<EventPublicPlayer>;
  httpcode?:number;
  result?:boolean;
}
