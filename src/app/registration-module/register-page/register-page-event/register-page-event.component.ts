import { RegisterRequest } from './../../_interfaces/register-request';
import { EventPublic } from './../../_interfaces/event-public';
import { RegisterEventController } from './../../_controllers/register-event.controller';
import { Component, Input, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faDollarSign, faMapMarkerAlt, faStopwatch, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-page-event',
  templateUrl: './register-page-event.component.html',
  styleUrls: ['./register-page-event.component.scss']
})
export class RegisterPageEventComponent implements OnInit {

  faCalendar = faCalendar;
  faMapPin = faMapMarkerAlt;
  faClock = faStopwatch;
  faSpin = faSyncAlt;

  is_requesting = true;
  constructor(private register_event_controller:RegisterEventController, private route: ActivatedRoute) { }

  uuid:string = "";

  @Input()
  event!: EventPublic;

  page_active = 'home'

  ngOnInit() {
    this.uuid = String(this.route.snapshot.paramMap.get('uuid'));
  }

}
