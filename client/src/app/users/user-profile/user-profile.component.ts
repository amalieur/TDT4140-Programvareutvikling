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
  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) this.router.navigateByUrl("/");
    // Get user data from JWT token
    const user_data = JSON.parse(atob(token.split(".")[1])).data[0];
    console.log(user_data)
    // Gets all categories and displays them in dropdown
    this.userService.getUser(user_data.userId).then(user => {
      this.user = user;
    }).catch (error => {
      console.log("Error getting user: " + error);
    });
  }

}
