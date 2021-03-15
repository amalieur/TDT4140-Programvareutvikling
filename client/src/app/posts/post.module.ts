import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from './post-form/post-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostThumbnailComponent } from './post-thumbnail/post-thumbnail.component';



@NgModule({
  declarations: [
    PostFormComponent,
    PostDetailsComponent,
    PostListComponent,
    PostThumbnailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [ PostThumbnailComponent ]
})

export class PostModule { }
