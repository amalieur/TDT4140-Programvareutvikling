import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent {

  @Input()
  label: string = "";

  @Input()
  inputModel: number;

  @Input()
  placeholder: string = "";

  @Output()
  inputModelChange = new EventEmitter<number>();

  @Output()
  change = new EventEmitter();

  @Output()
  focus = new EventEmitter();

  @Output()
  blur = new EventEmitter();

  constructor() { }

}
