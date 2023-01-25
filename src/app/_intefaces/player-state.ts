import { Country } from "./country";

export interface State{
  id:number;
  name:string;
  slug:string;

  country_id:number;

  country?:Country;
}
