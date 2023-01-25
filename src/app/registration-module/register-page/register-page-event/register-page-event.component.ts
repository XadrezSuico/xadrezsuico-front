import { XadrezSuicoTitleService } from './../../../_services/title.service';
import { EventPublic } from './../../_interfaces/event-public';
import { RegisterEventController } from './../../_controllers/register-event.controller';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt, faStopwatch, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-page-event',
  templateUrl: './register-page-event.component.html',
  styleUrls: ['./register-page-event.component.scss']
})
export class RegisterPageEventComponent implements OnInit, AfterViewInit {

  faCalendar = faCalendar;
  faMapPin = faMapMarkerAlt;
  faClock = faStopwatch;
  faSpin = faSyncAlt;

  is_requesting = true;
  constructor(private register_event_controller:RegisterEventController, private route: ActivatedRoute, private title_service:XadrezSuicoTitleService) { }

  uuid:string = "";

  @Input()
  event!: EventPublic;

  page_active = 'home'

  ngOnInit() {
    this.uuid = String(this.route.snapshot.paramMap.get('uuid'));
  }
  ngAfterViewInit(): void {
    if(this.event){
      this.title_service.setTitle(this.event.info.title);
    }
  }

}
