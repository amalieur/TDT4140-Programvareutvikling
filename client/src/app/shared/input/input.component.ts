import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  
  @Input()
  dark: boolean = true;

  @Input()
  label: string = "";

  @Input()
  type: string = "text";

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

  isVisible: boolean = false;
  toggleText: string = "Show";

  constructor() { }

  togglePasswordVisible() {
    this.isVisible = !this.isVisible;
    this.toggleText = this.isVisible ? "Hide" : "Show";
  }

}
