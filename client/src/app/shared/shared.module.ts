import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { ButtonComponent } from './button/button.component';
import { SelectComponent } from './select/select.component';


@NgModule({
  declarations: [
    TextInputComponent,
    NumberInputComponent,
    ButtonComponent,
    SelectComponent,
    PasswordInputComponent
  ],
  exports: [
    TextInputComponent,
    NumberInputComponent,
    PasswordInputComponent,
    ButtonComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
