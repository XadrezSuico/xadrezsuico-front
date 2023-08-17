import { SharedRoutingModule } from './shared-module-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerRegistrationComponent } from '../player/player-registration/player-registration.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { Select2Module } from 'ng-select2-component';
import { RouterModule } from '@angular/router';
import { NewClubFormComponent } from './new-club-form/new-club-form.component';
import { NewStateFormComponent } from './new-state-form/new-state-form.component';
import { NewCityFormComponent } from './new-city-form/new-city-form.component';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
    imports: [
      CommonModule,
      FontAwesomeModule,
      ReactiveFormsModule,
      FormsModule,
      NgbModule,
      NgbNavModule,
      Select2Module,
      NgxMaskModule.forChild(),
      RouterModule,
      SharedRoutingModule,
      DataTablesModule
     ],
    declarations: [
      PlayerRegistrationComponent,
      NewClubFormComponent,
      NewStateFormComponent,
      NewCityFormComponent
    ],
    exports: [
      PlayerRegistrationComponent,
      NewClubFormComponent,
      NewStateFormComponent,
      NewCityFormComponent
    ]
})
export class SharedModule { }
