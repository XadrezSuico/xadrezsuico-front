import { build_environment } from './../environments/build/build-environment';
import { SharedModule } from './shared-module/shared-module.module';
import { RegistrationModuleModule } from './registration-module/registration-module.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopbarComponent } from './topbar/topbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { PageModuleModule } from './page-module/page-module.module';
import { PlayerModule } from './player/player.module';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { PixelModule } from 'ngx-pixel';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

let imports = [
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
  PlayerModule,
];

if(build_environment.gtag){
  imports[imports.length] = NgxGoogleAnalyticsModule.forRoot(build_environment.gtag_code);
}
if(build_environment.fb_pixel){
  imports[imports.length] = PixelModule.forRoot({ enabled: true, pixelId: build_environment.fb_pixel_code });
}

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent
  ],
  imports: imports,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
