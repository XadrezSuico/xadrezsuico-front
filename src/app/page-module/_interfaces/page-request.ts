import { Page } from './page';
export interface PageRequest{
  ok:number;
  error:number;
  message?:string;
  page?:Page;
  httpcode?:number;
}
