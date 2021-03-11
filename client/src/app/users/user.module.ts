import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserProfileEditFormComponent } from './user-profile-edit-form/user-profile-edit-form.component';



@NgModule({
  declarations: [
    UserRegistrationFormComponent,
    UserProfileComponent,
    UserLoginFormComponent,
    UserLogoutComponent,
    UserProfileEditFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})

export class UserModule { }
