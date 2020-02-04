import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';


@NgModule({
  declarations: [RoomComponent],
  imports: [
    SharedModule,
    RoomRoutingModule
  ]
})
export class RoomModule { }
