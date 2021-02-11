import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from './post-form/post-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PostFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PostModule { }
