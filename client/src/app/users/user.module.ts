import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PostModule } from '../posts/post.module';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserGuestProfileComponent } from './user-guest-profile/user-guest-profile.component';
import { UserProfileEditFormComponent } from './user-profile-edit-form/user-profile-edit-form.component';
import { UserReviewDetailComponent } from './user-review-detail/user-review-detail.component';



@NgModule({
  declarations: [
    UserRegistrationFormComponent,
    UserProfileComponent,
    UserLoginFormComponent,
    UserGuestProfileComponent,
    UserProfileEditFormComponent,
    UserReviewDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PostModule
  ]
})

export class UserModule { }
