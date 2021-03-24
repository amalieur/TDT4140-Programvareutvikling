import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

interface IUserLogin {
  username: string;
  password: string;
}

@Component({
  selector: 'app-user-profile-edit-form',
  templateUrl: './user-profile-edit-form.component.html',
  styleUrls: ['./user-profile-edit-form.component.scss']
})
export class UserProfileEditFormComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  user: User = new User();
  username: string = "";
  email: string = "";
  password: string = "";
  confirm_password: string = "";

  statusMessage: string = "";

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    
    // Gets all user information and displays them in the component
    if (this.user.getUserId !== 0) {
      this.username = this.user.getUsername;
      this.email = this.user.getEmail;
      this.password = this.user.getPassword;
      this.confirm_password = this.user.getPassword;
    } else {
      console.log("Error getting user information!");
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
    else if (this.email == "") {
      this.setStatusMessage("Eposten kan ikke være tom");
      return false;
    }
    else if (this.password == "") {
      this.setStatusMessage("Passordet kan ikke være tomt");
      return false;
    }
    else if (this.confirm_password == "") {
      this.setStatusMessage("Passordet kan ikke være tomt");
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
   * Updates the user if given arguments are valid
   */
  updateUser() {
    if (this.checkForm()) {
      const updatedUser = new User({
        username: this.username,
        email: this.email,
        password: this.password,
      });
      const loginUser: IUserLogin = {
        username: this.username,
        password: this.password,
      };
      // 
      // Updates user in database and redirects to the profile page afterwards

      this.userService.updateUser(updatedUser,this.user.getUserId).then(status => {
        console.log("User was updated: " + JSON.stringify(status));
        this.authService.login(loginUser).then(() =>
          this.router.navigateByUrl("/profil")
        );
      }).catch(error => {
        console.log("Error updating user: " + error);
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





