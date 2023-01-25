import { XadrezSuicoDefault } from "./default";

export interface XadrezSuicoRequest{
  ok:number;
  error:number;
  message?:string;
  defaults:XadrezSuicoDefault;
}
