import { EventPublic } from './../../../_interfaces/event-public';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-page-event-home',
  templateUrl: './register-page-event-home.component.html',
  styleUrls: ['./register-page-event-home.component.scss']
})
export class RegisterPageEventHomeComponent implements OnInit {

  constructor() { }

  @Input()
  event!:EventPublic;

  @Output()
  change_page_emitter:EventEmitter<string> = new EventEmitter<string>()

  ngOnInit(): void {
  }

  goToPage(slug:string){
    this.change_page_emitter.emit(slug);
  }

}
