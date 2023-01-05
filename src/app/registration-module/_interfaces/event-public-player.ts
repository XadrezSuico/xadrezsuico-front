export interface EventPublicPlayer{
  id:number;
  name:string;
  birthday:string;
  fide_id?:number;
  cbx_id?:number;
  lbx_id?:number;
  chesscom_username?:string;
  lichess_username?:string;
  city:string;
  club?:string;

  can_register:boolean;
  register_status:boolean;
}
