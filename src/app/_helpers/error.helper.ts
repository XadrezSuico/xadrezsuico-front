import { Router } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ErrorHelper{
  constructor(private router:Router){

  }

  catchHttpError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      return {
        ok: 0,
        error: 1,
        message: 'Ocorreu um erro: '.concat(error.error.message),
        httpcode: error.status
      }
    }else{
      return error.error;
    }
  }
}
