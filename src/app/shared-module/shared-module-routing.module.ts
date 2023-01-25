import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerRegistrationComponent } from '../player/player-registration/player-registration.component';

const routes: Routes = [
  {
    path: 'registration',
    component: PlayerRegistrationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
