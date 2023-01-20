import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { PageRequest } from './../_interfaces/page-request';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss']
})
export class PageErrorComponent implements OnInit {

  faTimes = faTimesCircle

  constructor() { }

  @Input()
  request!:PageRequest;

  ngOnInit(): void {
  }

}
