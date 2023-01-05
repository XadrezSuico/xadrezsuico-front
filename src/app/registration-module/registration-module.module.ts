import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPageEventComponent } from './register-page/register-page-event/register-page-event.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationModuleComponent } from './registration-module.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterErrorComponent } from './register-page/register-error/register-error.component';
import { RegisterNotFoundComponent } from './register-page/register-not-found/register-not-found.component';
import { RegisterPageEventHomeComponent } from './register-page/register-page-event/register-page-event-home/register-page-event-home.component';
import { RegisterPageEventInscreverComponent } from './register-page/register-page-event/register-page-event-inscrever/register-page-event-inscrever.component';
import { RegisterPageEventInscreverFormComponent } from './register-page/register-page-event/register-page-event-inscrever/register-page-event-inscrever-form/register-page-event-inscrever-form.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbNavModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    RegistrationModuleComponent,
    RegisterPageEventComponent,
    RegisterPageComponent,
    RegisterErrorComponent,
    RegisterNotFoundComponent,
    RegisterPageEventHomeComponent,
    RegisterPageEventInscreverComponent,
    RegisterPageEventInscreverFormComponent
  ],
  exports:[RegistrationModuleComponent]
})
export class RegistrationModuleModule { }
