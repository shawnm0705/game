import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DavinciCodeComponent } from '../davinci-code/davinci-code.component';
import { RoomComponent } from '../room/room.component';

const routes: Routes = [
  {
    path: 'room/:game',
    component: RoomComponent
  },
  {
    path: 'davinci_code',
    component: DavinciCodeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
