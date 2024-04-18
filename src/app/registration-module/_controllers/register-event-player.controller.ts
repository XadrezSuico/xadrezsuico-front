import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorHelper } from "src/app/_helpers/error.helper";
import { environment } from "src/environments/environment";
import { RegisterRequest } from "../_interfaces/register-request";

@Injectable({
  providedIn: 'root'
})
export class RegisterEventPlayerController{

  constructor(private http: HttpClient, private errorHelper:ErrorHelper) {

  }


  async search(uuid:string,search:string){
    let url:string = `${environment.api}/v1/event/${uuid}/players/search?q=${search}`;
    const result = await this.http.get<RegisterRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
  async get(uuid:string,player_id:number){
    let url:string = `${environment.api}/v1/event/${uuid}/players/get/${player_id}`;
    const result = await this.http.get<RegisterRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
  async complete(uuid:string,player_id:number,fields:any){
    console.log(Object.assign({},fields));
    let url:string = `${environment.api}/v1/event/${uuid}/players/complete/${player_id}`;
    const result = await this.http.post<RegisterRequest>(url,Object.assign({},fields)).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
}
