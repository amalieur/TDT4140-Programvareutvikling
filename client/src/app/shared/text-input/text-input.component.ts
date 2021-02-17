import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {
  
  @Input()
  label: string = "";

  @Input()
  inputModel: string;

  @Input()
  placeholder: string = "";

  @Output()
  inputModelChange = new EventEmitter<string>();

  @Output()
  change = new EventEmitter();

  @Output()
  focus = new EventEmitter();

  @Output()
  blur = new EventEmitter();

  constructor() { }

}
