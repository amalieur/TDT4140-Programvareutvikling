import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';



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
    // Check for token expiration
    if (this.authService.checkTokenExpiration()) { // redirects to "/" if token is expired
      // Get user data from JWT token
      const token = localStorage.getItem('token');
      const user_data = JSON.parse(atob(token.split(".")[1])).data[0];
      
      // Gets all user information and displays them in the component
      this.userService.getUser(user_data.userId).then(user => {
        this.user = user;
        // todo:
        this.username = user.getUsername;
        this.email = user.getEmail;
        this.password = user.getPassword;
        this.confirm_password = user.getPassword;
      }).catch (error => {
        console.log("Error getting user: " + error);
      });
    }
    console.log(this.user);
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
      // 
      // Updates user in database and redirects to the profile page afterwards

      this.userService.updateUser(updatedUser,this.user.getUserId).then(status => {
        console.log("User was updated: " + JSON.stringify(status));
        this.router.navigateByUrl("/profil");
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





