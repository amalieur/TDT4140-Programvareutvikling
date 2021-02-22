import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  username: string = "";
  email: string = "";
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
    else if (this.email == "") {
      this.setStatusMessage("Eposten kan ikke være tom");
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
   * Publishes user if it is valid.
   */
  registerUser() {
    if (this.checkForm()) {
      const newUser = new User({
        username: this.username,
        email: this.email,
        password: this.password,
      });

      // Adds user to database and changes page afterwards
      this.authService.registerUser(newUser).then(status => {
        console.log("User was added: " + JSON.stringify(status));
        this.router.navigateByUrl("/");
      }).catch(error => {
        console.log("Error adding user: " + error);
      });
    }
  }

  /**
   * Sets a status message.
   */
  setStatusMessage(message: string) {
    this.statusMessage = message;
  }
}
