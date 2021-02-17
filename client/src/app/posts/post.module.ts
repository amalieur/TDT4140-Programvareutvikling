import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from './post-form/post-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PostDetailsComponent } from './post-details/post-details.component';



@NgModule({
  declarations: [
    PostFormComponent,
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})

export class PostModule { }
