import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';



@NgModule({
  declarations: [
    UserRegistrationFormComponent,
    UserProfileComponent,
    UserLoginFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})

export class UserModule { }