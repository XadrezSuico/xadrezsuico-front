import { XadrezSuicoRequest } from './../_intefaces/request';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorHelper } from "src/app/_helpers/error.helper";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClubController{

  constructor(private http: HttpClient, private errorHelper:ErrorHelper) {

  }


  async search(search:string){
    let url:string = `${environment.api}/v1/club/search?q=${search}`;
    const result = await this.http.get<XadrezSuicoRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
  async get(club_id:number){
    let url:string = `${environment.api}/v1/club/get/${club_id}`;
    const result = await this.http.get<XadrezSuicoRequest>(url).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
  async new(fields:any){
    let url:string = `${environment.api}/v1/club/new`;
    const result = await this.http.post<XadrezSuicoRequest>(url,Object.assign({}, fields)).toPromise()
    .catch((err: HttpErrorResponse) => {
      return this.errorHelper.catchHttpError(err);
    });
    return result;
  }
}
