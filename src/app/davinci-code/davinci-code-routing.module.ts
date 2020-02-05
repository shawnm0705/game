import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DavinciCodeComponent } from './davinci-code.component';

const routes: Routes = [
  {
    path: '',
    component: DavinciCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DavinciCodeRoutingModule { }
