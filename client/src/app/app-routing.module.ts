import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { UserRegistrationFormComponent } from './users/user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './users/user-login-form/user-login-form.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserGuestProfileComponent } from './users/user-guest-profile/user-guest-profile.component';
import { AdminCategoryComponent} from './categories/admin-category/admin-category.component';

const routes: Routes = [
  { path: 'annonse/ny', component: PostFormComponent },
  { path: 'annonse/rediger/:id', component: PostFormComponent },
  { path: 'annonse', component: PostListComponent },
  { path: 'annonse/:id', component: PostDetailsComponent },

  { path: 'user/:id', component: UserGuestProfileComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'register', component: UserRegistrationFormComponent },
  { path: 'login', component: UserLoginFormComponent },
  
  { path: 'admin/category', component: AdminCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }