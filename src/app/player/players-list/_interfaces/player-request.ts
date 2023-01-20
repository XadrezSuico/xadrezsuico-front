import { Player } from './player';
export interface PlayerRequest{
  ok:number;
  error:number;
  message?:string;
  player?:Player;
  players?:Array<Player>;
}
