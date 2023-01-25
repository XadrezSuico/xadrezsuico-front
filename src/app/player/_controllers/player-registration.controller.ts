import { PlayerRequest } from './../_interfaces/player-request';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorHelper } from "src/app/_helpers/error.helper";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlayerRegistrationController{

  constructor(private http: HttpClient, private errorHelper:ErrorHelper) {

  }

  async check(name:string="", birthday:string="", documents:Array<any> = []){
    let url:string = `${environment.api}/v1/player/registration/check`;

    let body:any = [];
    if(name !== "" && birthday !== ""){
      body["name"] = name;
      body["birthday"] = birthday;
    }else if(documents.length > 0){
      body["documents"] = documents;
    }else{
      return {ok:0,error:1,message:"Não foi possível conferir se existe o jogador já cadastrado."};
    }

    const result = await this.http.post<PlayerRequest>(url,Object.assign({}, body)).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
  async register(data:any){
    let url:string = `${environment.api}/v1/player/registration/register`;

    const result = await this.http.post<PlayerRequest>(url,Object.assign({}, data)).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
}
