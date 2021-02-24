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
  confirm_password: string = "";

  statusMessage: string = "";

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Validates the form
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
    else if (this.confirm_password == "") {
      this.setStatusMessage("Passordet kan ikke være tom");
      return false;
    }
    else if (this.confirm_password !== this.password) {
      this.setStatusMessage("Passordene gitt samsvarer ikke");
      return false;
    }

    this.setStatusMessage("");
    return true;
  }

  /**
   * Publishes and registers the user if given arguments are valid
   */
  registerUser() {
    if (this.checkForm()) {
      const newUser = new User({
        username: this.username,
        email: this.email,
        password: this.password,
      });

      // Adds user to database and redirects to the homepage afterwards
      this.authService.registerUser(newUser).then(status => {
        console.log("User was added: " + JSON.stringify(status));
        this.router.navigateByUrl("/login");
      }).catch(error => {
        console.log("Error adding user: " + error);
      });
    }
  }

  /**
   * Sets the status message for user feedback on form submit
   */
  setStatusMessage(message: string) {
    this.statusMessage = message;
  }
}
