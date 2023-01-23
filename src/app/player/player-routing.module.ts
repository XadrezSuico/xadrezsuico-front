import { PlayerRegistrationComponent } from './player-registration/player-registration.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'players',
    component: PlayersListComponent
  },
  {
    path: 'registration',
    component: PlayerRegistrationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
