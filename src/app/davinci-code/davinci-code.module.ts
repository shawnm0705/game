import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { DavinciCodeRoutingModule } from './davinci-code-routing.module';
import { DavinciCodeComponent } from './davinci-code.component';
import { DavinciCodeCardComponent } from './davinci-code-card/davinci-code-card.component';

@NgModule({
  declarations: [DavinciCodeComponent, DavinciCodeCardComponent],
  imports: [
    SharedModule,
    DavinciCodeRoutingModule
  ]
})
export class DavinciCodeModule { }
