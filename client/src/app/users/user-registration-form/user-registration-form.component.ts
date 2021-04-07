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
  firstname: string = "";
  lastname: string = "";
  username: string = "";
  email: string = "";
  phone_number: string = "";
  location: string = "Velg fylke . . .";
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
    if (this.firstname == "") {
      this.setStatusMessage("Fornavn kan ikke være tom");
      return false;
    }
    else if (this.lastname == "") {
      this.setStatusMessage("Etternavn kan ikke være tom");
      return false;
    }
    else if (this.username == "") {
      this.setStatusMessage("Brukernavn kan ikke være tom");
      return false;
    }
    else if (this.email == "") {
      this.setStatusMessage("Eposten kan ikke være tom");
      return false;
    }
    else if (this.phone_number == "") {
      this.setStatusMessage("Mobilnummer kan ikke være tom");
      return false;
    }
    else if (this.location == "Velg fylke . . .") {
      this.setStatusMessage("Fylke må være valgt");
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
        isAdmin: 0,
        location: this.location
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
