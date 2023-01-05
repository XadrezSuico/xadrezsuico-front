import { RegisterRequest } from './../../_interfaces/register-request';
import { Component, Input, OnInit } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-error',
  templateUrl: './register-error.component.html',
  styleUrls: ['./register-error.component.scss']
})
export class RegisterErrorComponent implements OnInit {

  faTimes = faTimesCircle;

  @Input()
  request!:RegisterRequest;

  constructor() { }

  ngOnInit(): void {
  }

}
