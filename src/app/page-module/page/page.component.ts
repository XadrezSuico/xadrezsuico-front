import { PageRequest } from './../_interfaces/page-request';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { PageController } from './../_controllers/page.controller';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterViewInit {

  faSpin = faSyncAlt;
  constructor(private page_controller:PageController, private route:ActivatedRoute) { }

  uuid:string = "";
  is_requesting = true;

  tab = 'page'
  request!:PageRequest;

  ngOnInit(): void {
    this.uuid = String(this.route.snapshot.paramMap.get('uuid'));

    switch(this.uuid){
      case "termosdeuso":
        this.uuid = 'ca6f1c00-3868-43fe-9258-0da65acefb0a';
        break;
      case "politicadeprivacidade":
        this.uuid = '16f32fa4-c9f8-43ca-bc41-b7ceac03b60e';
        break;
    }
  }
  ngAfterViewInit(): void {
    this.get();
  }

  async get(){
    this.request = await this.page_controller.get(this.uuid);
    if(this.request.ok === 1){
      this.tab = 'page'
    }else{
      if(this.request.httpcode){
        if(this.request.httpcode === 404){
          this.tab = '404';
        }else{
          this.tab = "error";
        }
      }else{
        this.tab = "error";
      }
    }

    setTimeout(()=>{
      this.is_requesting = false;
    },300);
  }

}
