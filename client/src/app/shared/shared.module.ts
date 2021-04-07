import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { SelectComponent } from './select/select.component';
import { TextAreaInputComponent } from './text-area-input/text-area-input.component';


@NgModule({
  declarations: [
    InputComponent,
    TextAreaInputComponent,
    ButtonComponent,
    SelectComponent
  ],
  exports: [
    InputComponent,
    TextAreaInputComponent,
    ButtonComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
