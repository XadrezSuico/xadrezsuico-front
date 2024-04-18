import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorHelper } from "src/app/_helpers/error.helper";
import { environment } from "src/environments/environment";
import { RegisterRequest } from "../_interfaces/register-request";

@Injectable({
  providedIn: 'root'
})
export class RegisterEventSexController{

  constructor(private http: HttpClient, private errorHelper:ErrorHelper) {

  }


  async list(){
    let url:string = `${environment.api}/v1/sexes/list`;
    const result = await this.http.get<RegisterRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
}
