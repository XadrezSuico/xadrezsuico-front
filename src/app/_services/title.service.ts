import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class XadrezSuicoTitleService{
  constructor(private title_service:Title) { }

  setTitle(value:any = null){
    if(value){
      this.title_service.setTitle(String(value).concat(" - XadrezSuíço"));
    }else{
      this.title_service.setTitle("XadrezSuíço");
    }
  }

}
