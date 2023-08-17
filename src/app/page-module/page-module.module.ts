import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { PageModuleRouting } from './page-module-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageErrorComponent } from './page-error/page-error.component';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    PageComponent,
    PageNotFoundComponent,
    PageErrorComponent
  ],
  imports: [
    CommonModule,
    PageModuleRouting,
    FontAwesomeModule,
    DataTablesModule
  ]
})
export class PageModuleModule { }
