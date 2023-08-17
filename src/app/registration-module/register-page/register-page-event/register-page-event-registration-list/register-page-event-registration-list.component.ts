import { RegisterEventController } from 'src/app/registration-module/_controllers/register-event.controller';
import { faCircleNotch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit } from '@angular/core';
import { EventPublic } from 'src/app/registration-module/_interfaces/event-public';
import { EventPublicRegistration } from 'src/app/registration-module/_interfaces/event-public-registration';

@Component({
  selector: 'app-register-page-event-registration-list',
  templateUrl: './register-page-event-registration-list.component.html',
  styleUrls: ['./register-page-event-registration-list.component.scss']
})
export class RegisterPageEventRegistrationListComponent implements OnInit {

  dtOptions:DataTables.Settings = {};

  faTimes = faTimesCircle;
  faLoading = faCircleNotch;
  constructor(private register_event_controller:RegisterEventController) { }

  @Input()
  event!:EventPublic;

  is_requesting = true;

  page = 'list'

  message = "";

  registrations:Array<EventPublicRegistration> = [];

  ngOnInit(): void {
    if(this.event){
      this.list();
    }
  }

  async list(){
    if(this.event){
      if(this.event.uuid){
        let response = await this.register_event_controller.registration_list(this.event.uuid);

        if(response.ok == 1){
          this.registrations = response.registrations;
        }else{
          this.message = response.message;
          this.page = "error";
        }
      }
    }

    this.setIsRequesting(false,500);
  }

  setIsRequesting(value:boolean,time:number){
    setTimeout(()=>{
      this.is_requesting = value;
    },time);
  }

}
