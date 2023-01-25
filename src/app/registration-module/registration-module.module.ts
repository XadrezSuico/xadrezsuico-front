import { SharedModule } from './../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPageEventComponent } from './register-page/register-page-event/register-page-event.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationModuleComponent } from './registration-module.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterErrorComponent } from './register-page/register-error/register-error.component';
import { RegisterNotFoundComponent } from './register-page/register-not-found/register-not-found.component';
import { RegisterPageEventHomeComponent } from './register-page/register-page-event/register-page-event-home/register-page-event-home.component';
import { RegisterPageEventInscreverComponent } from './register-page/register-page-event/register-page-event-inscrever/register-page-event-inscrever.component';
import { RegisterPageEventInscreverFormComponent } from './register-page/register-page-event/register-page-event-inscrever/register-page-event-inscrever-form/register-page-event-inscrever-form.component';

import { Select2Module } from 'ng-select2-component';
import { RegisterPageEventUpdatePlayerComponent } from './register-page/register-page-event/register-page-event-inscrever/register-page-event-update-player/register-page-event-update-player.component';
import { RegisterPageEventRegistrationListComponent } from './register-page/register-page-event/register-page-event-registration-list/register-page-event-registration-list.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbNavModule,
    NgbModalModule,
    ReactiveFormsModule,
    FormsModule,
    Select2Module,
    NgxMaskModule.forChild(),
    SharedModule
  ],
  declarations: [
    RegistrationModuleComponent,
    RegisterPageEventComponent,
    RegisterPageComponent,
    RegisterErrorComponent,
    RegisterNotFoundComponent,
    RegisterPageEventHomeComponent,
    RegisterPageEventInscreverComponent,
    RegisterPageEventInscreverFormComponent,
    RegisterPageEventUpdatePlayerComponent,
    RegisterPageEventRegistrationListComponent
  ],
  exports:[RegistrationModuleComponent]
})
export class RegistrationModuleModule { }
