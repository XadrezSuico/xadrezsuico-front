import { SharedModule } from './shared-module/shared-module.module';
import { PlayerRegistrationComponent } from './player/player-registration/player-registration.component';
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
import { PageModuleModule } from './page-module/page-module.module';
import { PlayerModule } from './player/player.module';

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
    PageModuleModule,
    SharedModule,
    PlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
