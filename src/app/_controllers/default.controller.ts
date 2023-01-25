import { XadrezSuicoRequest } from './../_intefaces/request';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorHelper } from "src/app/_helpers/error.helper";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DefaultController{

  constructor(private http: HttpClient, private errorHelper:ErrorHelper) {

  }

  async get(){
    let url:string = `${environment.api}/v1/defaults`;
    const result = await this.http.get<XadrezSuicoRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
}
