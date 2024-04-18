import { PlayerRequest } from './../_interfaces/player-request';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorHelper } from "src/app/_helpers/error.helper";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlayerController{

  constructor(private http: HttpClient, private errorHelper:ErrorHelper) {

  }

  async list(query:string){
    let url:string = `${environment.api}/v1/player/list?q=${query}`;
    const result = await this.http.get<PlayerRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
}
