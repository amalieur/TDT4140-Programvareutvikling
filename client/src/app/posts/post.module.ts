import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from './post-form/post-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PostFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})

export class PostModule { }
