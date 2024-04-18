import { XadrezSuicoRequest } from './../_intefaces/request';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorHelper } from "src/app/_helpers/error.helper";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StateController{

  constructor(private http: HttpClient, private errorHelper:ErrorHelper) {

  }


  async list(country_id:number){
    let url:string = `${environment.api}/v1/location/state/list/${country_id}`;
    const result = await this.http.get<XadrezSuicoRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
  async get(id:number){
    let url:string = `${environment.api}/v1/location/state/get/${id}`;
    const result = await this.http.get<XadrezSuicoRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
  async new(fields:any){
    let url:string = `${environment.api}/v1/location/state/new`;
    const result = await this.http.post<XadrezSuicoRequest>(url,Object.assign({}, fields)).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
}
