import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayersListComponent } from './players-list/players-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerRegistrationComponent } from './player-registration/player-registration.component';
import { Select2Module } from 'ng-select2-component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    PlayersListComponent,
    PlayerRegistrationComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbNavModule,
    Select2Module,
    NgxMaskModule.forChild(),
  ]
})
export class PlayerModule { }
