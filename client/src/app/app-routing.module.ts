import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { UserRegistrationFormComponent } from './users/user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './users/user-login-form/user-login-form.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserGuestProfileComponent } from './users/user-guest-profile/user-guest-profile.component';
import { AdminComponent} from './categories/admin/admin.component';
import { HomeComponent } from './home/home.component';
import { UserProfileEditFormComponent } from './users/user-profile-edit-form/user-profile-edit-form.component';


const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'annonse/ny', component: PostFormComponent },
  { path: 'annonse/rediger/:id', component: PostFormComponent },
  { path: 'annonse', component: PostListComponent },
  { path: 'annonse/:id', component: PostDetailsComponent },

  { path: 'user/:id', component: UserGuestProfileComponent },
  { path: 'profil', component: UserProfileComponent },
  { path: 'profil/rediger', component: UserProfileEditFormComponent},
  { path: 'register', component: UserRegistrationFormComponent },
  { path: 'login', component: UserLoginFormComponent },
  
  { path: 'admin/category', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }