import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationModuleRouting } from './registration-module/registration-module-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RegistrationModuleRouting
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
