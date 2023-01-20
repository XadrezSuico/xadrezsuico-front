import { PageRequest } from './../_interfaces/page-request';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorHelper } from "src/app/_helpers/error.helper";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PageController{

  constructor(private http: HttpClient, private errorHelper:ErrorHelper) {

  }

  async get(page_uuid:string){
    let url:string = `${environment.api}/v1/page/get/${page_uuid}`;
    const result = await this.http.get<PageRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
}
