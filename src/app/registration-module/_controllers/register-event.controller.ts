import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorHelper } from "src/app/_helpers/error.helper";
import { environment } from "src/environments/environment";
import { RegisterRequest } from "../_interfaces/register-request";

@Injectable({
  providedIn: 'root'
})
export class RegisterEventController{

  constructor(private http: HttpClient, private errorHelper:ErrorHelper) {

  }


  async get(uuid:string){
    let url:string = `${environment.api}/v1/event/get/${uuid}`;
    const result = await this.http.get<RegisterRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }

  async register(
    uuid:string,
    accepts:any,
    category_id:number,
    player_id:number,
    city_id:number,
    club_id?:number
  ){
    let data;
    if(club_id){
      data = {
        accepts: accepts,
        category_id: category_id,
        player_id: player_id,
        city_id: city_id,
        club_id: club_id
      }
    }else{
      data = {
        accepts: accepts,
        category_id: category_id,
        player_id: player_id,
        city_id: city_id
      }
    }
    console.log(data);

    await new Promise(r => setTimeout(r, 300));

    let url:string = `${environment.api}/v1/event/register/${uuid}`;
    const result = await this.http.post<RegisterRequest>(url,data).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }

  async registration_list(uuid:string){
    let url:string = `${environment.api}/v1/event/register/list/${uuid}`;
    const result = await this.http.get<RegisterRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
}
