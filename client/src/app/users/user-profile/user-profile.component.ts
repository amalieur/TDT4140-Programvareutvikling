import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User = new User();
  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  /**
   * Deletes user in database and navigates to login
   */
  deleteUser() {
    this.userService.deleteUser(this.user.getUserId).then(data => {
      console.log("Successfully deleted user: " + this.user.getUserId);
      this.authService.logout();
      this.router.navigateByUrl("/login");
    }).catch(error => {
      console.log(error);
    });
  }
}

