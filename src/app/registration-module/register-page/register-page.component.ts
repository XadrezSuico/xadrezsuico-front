import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { RegisterRequest } from './../_interfaces/register-request';
import { EventPublic } from './../_interfaces/event-public';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterEventController } from '../_controllers/register-event.controller';
import { XadrezSuicoTitleService } from 'src/app/_services/title.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, AfterViewInit {

  faSpin = faSyncAlt;
  is_requesting = true;

  constructor(
    private register_event_controller:RegisterEventController,
    private route: ActivatedRoute,

    private title_service:XadrezSuicoTitleService
  ) { }

  uuid:string = "";

  event!:EventPublic;

  request!: RegisterRequest;

  is_error = false;
  is_event = false;
  is_event_request = false;
  is_404 = false;

  ngOnInit() {
    this.uuid = String(this.route.snapshot.paramMap.get('uuid'));
  }
  ngAfterViewInit() {
    this.getEvent();
  }


  async getEvent(){
    this.is_event_request = true;
    if(this.uuid){
      let retorno = await this.register_event_controller.get(this.uuid);
      console.log(retorno);
      if(retorno.ok){
        this.event = retorno.event;
        this.is_event = true;
      }else{
        if(retorno.httpcode === 404){
          this.title_service.setTitle("Evento não encontrado");
          this.is_404 = true;
        }else{
          this.title_service.setTitle("Erro");
          this.is_error = true;
        }
      }
    }else{
      this.title_service.setTitle("Erro");
      this.is_error = true;
    }
    this.setIsRequesting(false,400);
    this.is_event_request = false;
  }

  setIsRequesting(value:boolean,time:number){
    setTimeout(()=>{
      this.is_requesting = value;
    },time);
  }
}
