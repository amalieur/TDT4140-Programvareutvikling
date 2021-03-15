import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserGuestProfileComponent } from './user-guest-profile/user-guest-profile.component';
import { PostModule } from '../posts/post.module';



@NgModule({
  declarations: [
    UserRegistrationFormComponent,
    UserProfileComponent,
    UserLoginFormComponent,
    UserLogoutComponent,
    UserGuestProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostModule,
    FormsModule
  ]
})

export class UserModule { }
