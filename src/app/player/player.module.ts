import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayersListComponent } from './players-list/players-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PlayersListComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PlayerModule { }
