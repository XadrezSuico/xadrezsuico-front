import { EventPublic } from './../../../_interfaces/event-public';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page-event-home',
  templateUrl: './register-page-event-home.component.html',
  styleUrls: ['./register-page-event-home.component.scss']
})
export class RegisterPageEventHomeComponent implements OnInit {

  constructor() { }

  @Input()
  event!:EventPublic;

  ngOnInit(): void {
  }

}
