import { State } from './player-state';
export interface City{
  id:number;
  name:string;

  state_id?:number;

  state?:State;
}
