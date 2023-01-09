import { RegistrationModuleModule } from './registration-module/registration-module.module';
import { RegistrationModuleComponent } from './registration-module/registration-module.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopbarComponent } from './topbar/topbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
      TopbarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RegistrationModuleModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Select2Module,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
