import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { FormsModule } from '@angular/forms';
import { NumberInputComponent } from './number-input/number-input.component';
import { ButtonComponent } from './button/button.component';
import { SelectComponent } from './select/select.component';


@NgModule({
  declarations: [
    TextInputComponent,
    NumberInputComponent,
    ButtonComponent,
    SelectComponent
  ],
  exports: [
    TextInputComponent,
    NumberInputComponent,
    ButtonComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
