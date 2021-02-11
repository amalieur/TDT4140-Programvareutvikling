import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';



@NgModule({
  declarations: [TextInputComponent],
  exports: [TextInputComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
