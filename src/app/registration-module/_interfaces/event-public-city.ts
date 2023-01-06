import { EventPublicState } from './event-public-state';
export interface EventPublicCity{
  id:number;
  name:string;

  state_id:number;
  state?:EventPublicState;
}
