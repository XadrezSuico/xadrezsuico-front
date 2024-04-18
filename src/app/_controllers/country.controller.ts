import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorHelper } from "src/app/_helpers/error.helper";
import { environment } from "src/environments/environment";
import { XadrezSuicoRequest } from "../_intefaces/request";

@Injectable({
  providedIn: 'root'
})
export class CountryController{

  constructor(private http: HttpClient, private errorHelper:ErrorHelper) {

  }


  async list(){
    let url:string = `${environment.api}/v1/location/country/list`;
    const result = await this.http.get<XadrezSuicoRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
  async get(id:number){
    let url:string = `${environment.api}/v1/location/country/get/${id}`;
    const result = await this.http.get<XadrezSuicoRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
}
