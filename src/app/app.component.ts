import { DefaultSingleton } from './_singleton/default';
import { DefaultController } from './_controllers/default.controller';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'xadrezsuico-front';
  default_singleton:DefaultSingleton;

  constructor(private default_controller:DefaultController) {
    this.default_singleton = DefaultSingleton.getInstance();
  }

  ngOnInit(): void {
    this.getDefaults();
  }

  async getDefaults(){
    let response = await this.default_controller.get();
    if(response.ok){
      this.default_singleton.setDefaults(response.defaults);
    }
  }


}
