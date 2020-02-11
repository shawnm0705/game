import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { DavinciCodeComponent } from '../davinci-code/davinci-code.component';
import { DavinciCodeCardComponent } from '../davinci-code/davinci-code-card/davinci-code-card.component';
import { RoomComponent } from '../room/room.component';

@NgModule({
  declarations: [
    DavinciCodeComponent,
    DavinciCodeCardComponent,
    RoomComponent
  ],
  imports: [
    SharedModule,
    GameRoutingModule
  ]
})
export class GameModule { }
