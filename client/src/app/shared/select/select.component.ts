import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input()
  label: string = "";

  @Input()
  inputModel: any;

  @Input()
  placeholder: string = "";

  @Output()
  inputModelChange = new EventEmitter<any>();

  @Output()
  change = new EventEmitter();

  @Output()
  focus = new EventEmitter();

  @Output()
  blur = new EventEmitter();

  constructor() { }

}
