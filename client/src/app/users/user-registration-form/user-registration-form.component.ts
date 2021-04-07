import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';

interface IUserLogin {
  username: string;
  password: string;
}

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

  user: User = null;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.router.url == "/profil/rediger") {
      this.user = this.authService.getCurrentUser();
      this.username = this.user.getUsername;
      this.email = this.user.getEmail;
      this.location = this.user.getLocation;
      this.firstname = this.user.getFirstName;
      this.lastname = this.user.getLastName;
      this.phone_number = this.user.getMobileNo;
    }
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
      if (this.user) {
        // Update user
        const updatedUser = new User({
          username: this.username,
          email: this.email,
          password: this.password,
          location: this.location,
          firstName: this.firstname,
          lastName: this.lastname,
          mobileNo: this.phone_number
        });
        const loginUser: IUserLogin = {
          username: this.username,
          password: this.password,
        };
        // Updates user in database and redirects to the profile page afterwards
  
        this.userService.updateUser(updatedUser, this.user.getUserId).then(status => {
          console.log("User was updated: " + JSON.stringify(status));
          this.authService.login(loginUser).then(() =>
            this.router.navigateByUrl("/profil")
          );
        }).catch(error => {
          console.log("Error updating user: " + error);
        });
      } else {
        // New user
        const newUser = new User({
          username: this.username,
          email: this.email,
          password: this.password,
          isAdmin: 0,
          location: this.location,
          firstName: this.firstname,
          lastName: this.lastname,
          mobileNo: this.phone_number
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
  }

  /**
   * Sets the status message for user feedback on form submit
   */
  setStatusMessage(message: string) {
    this.statusMessage = message;
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
