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
    // Check for token expiration
    if (this.authService.checkTokenExpiration()) { // redirects to "/" if token is expired
    // Get user data from JWT token
      const token = localStorage.getItem('token');
      const user_data = JSON.parse(atob(token.split(".")[1])).data[0];
      
      // Gets all user information and displays them in the component
      this.userService.getUser(user_data.userId).then(user => {
        this.user = user;
      }).catch (error => {
        console.log("Error getting user: " + error);
      });
    }
    
  }
}
