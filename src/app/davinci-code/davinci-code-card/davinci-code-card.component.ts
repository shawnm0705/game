import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-davinci-code-card',
  templateUrl: './davinci-code-card.component.html',
  styleUrls: ['./davinci-code-card.component.scss']
})
export class DavinciCodeCardComponent {
  @Input() color = 'white';
  @Input() content: string;
  @Input() mark: string;
  @Input() selected: boolean;
  @Input() opened: boolean;
  @Input() placeholder: boolean;

  constructor() { }

}
