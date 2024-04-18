import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorHelper } from "src/app/_helpers/error.helper";
import { environment } from "src/environments/environment";
import { PlayerRequest } from "../_interfaces/player-request";

@Injectable({
  providedIn: 'root'
})
export class PlayerSexController{

  constructor(private http: HttpClient, private errorHelper:ErrorHelper) {

  }


  async list(){
    let url:string = `${environment.api}/v1/sexes/list`;
    const result = await this.http.get<PlayerRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
}
