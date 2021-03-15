import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { UserRegistrationFormComponent } from './users/user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './users/user-login-form/user-login-form.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserLogoutComponent } from './users/user-logout/user-logout.component';

const routes: Routes = [
  { path: 'annonse/ny', component: PostFormComponent },
  { path: 'annonse/rediger/:id', component: PostFormComponent },
  { path: 'annonse', component: PostListComponent },
  { path: 'annonse/:id', component: PostDetailsComponent },

  { path: 'profile', component: UserProfileComponent },
  { path: 'register', component: UserRegistrationFormComponent },
  { path: 'login', component: UserLoginFormComponent },
  { path: 'logout', component: UserLogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }