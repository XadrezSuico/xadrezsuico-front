import { Component, OnInit } from '@angular/core';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-not-found',
  templateUrl: './register-not-found.component.html',
  styleUrls: ['./register-not-found.component.scss']
})
export class RegisterNotFoundComponent implements OnInit {

  faSearch = faSearch;
  constructor() { }

  ngOnInit(): void {
  }

}
