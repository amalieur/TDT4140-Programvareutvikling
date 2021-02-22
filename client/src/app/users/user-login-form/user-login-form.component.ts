import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  username: string = "";
  password: string = "";

  statusMessage: string = "";

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Validates form.
   */
  checkForm(): boolean {
    if (this.username == "") {
      this.setStatusMessage("Brukernavn kan ikke være tom");
      return false;
    }
    else if (this.password == "") {
      this.setStatusMessage("Passordet kan ikke være tom");
      return false;
    }

    this.setStatusMessage("");
    return true;
  }

  /**
   * Login the user if it is valid.
   */
  loginUser() {
    if (this.checkForm()) {
      const request = {
        username: this.username,
        password: this.password,
      };

      // Login the user
      this.authService.login(request).then(status => {
        console.log("User login1: " + JSON.stringify(status));
        this.router.navigateByUrl("/");
      }).catch(error => {
        console.log("Error user login: " + error);
      });
      /* Old
      this.userService.login(request).then(status => {
        console.log("User login2: " + JSON.stringify(status));
        this.router.navigateByUrl("/");
      }).catch(error => {
        console.log("Error adding user: " + error);
      });
      */
    }
  }

  /**
   * Sets a status message.
   */
  setStatusMessage(message: string) {
    this.statusMessage = message;
  }
}
