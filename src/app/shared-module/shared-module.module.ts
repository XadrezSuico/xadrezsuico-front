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
      SharedRoutingModule
     ],
    declarations: [
      PlayerRegistrationComponent
    ],
    exports: [
      PlayerRegistrationComponent
    ]
})
export class SharedModule { }
