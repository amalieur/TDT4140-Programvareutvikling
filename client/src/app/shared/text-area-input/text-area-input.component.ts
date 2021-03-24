import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['./text-area-input.component.scss']
})
export class TextAreaInputComponent {
  
  @Input()
  dark: boolean = true;

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
