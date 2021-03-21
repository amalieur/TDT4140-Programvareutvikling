import { Component, EventEmitter, Input, Output, ViewEncapsulation  } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PasswordInputComponent {

  isVisible: boolean = false;
  toggleText: string = "visibility";

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

  togglePasswordVisible() {
    this.isVisible = !this.isVisible;
    this.toggleText = this.isVisible ? "visibility" : "visibility_off";
  }

}
