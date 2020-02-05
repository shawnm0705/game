import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'room',
    loadChildren: './room/room.module#RoomModule',
  },
  {
    path: 'davinci_code',
    loadChildren: './davinci-code/davinci-code.module#DavinciCodeModule',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
