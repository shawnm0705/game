import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faCog, faArrowLeft, faUserAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from './services/utils.service';
import { P2PService} from './services/p2p.service';

@NgModule({
  declarations: [
  ],
  entryComponents: [

  ],
  providers: [
    UtilsService,
    P2PService
  ],
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faUserAlt, faArrowLeft, faCog, faEye);
  }
}
