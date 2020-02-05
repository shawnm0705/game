import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { DavinciCodeRoutingModule } from './davinci-code-routing.module';
import { DavinciCodeComponent } from './davinci-code.component';

@NgModule({
  declarations: [DavinciCodeComponent],
  imports: [
    SharedModule,
    DavinciCodeRoutingModule
  ]
})
export class DavinciCodeModule { }
