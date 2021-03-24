import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss', '../../app.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  username: string = "";
  password: string = "";

  statusMessage: string = "";

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getCurrentUser(false).getUserId) {
      this.router.navigate(["/"], {replaceUrl: true});
    }
  }

  /**
   * Validates the form
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
   * Login the user if it is valid
   */
  loginUser() {
    if (this.checkForm()) {
      const request = {
        username: this.username,
        password: this.password,
      };

      // Logins the user
      this.authService.login(request).then(status => {
        this.router.navigateByUrl("/");
      }).catch(error => {
        console.log("Error user login: " + error);
      });
    }
  }

  /**
   * Sets the status message
   */
  setStatusMessage(message: string) {
    this.statusMessage = message;
  }
}
