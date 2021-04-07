import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { PostService } from 'src/app/posts/post.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  user: new User();
  name: string = "";
  statusMessage: string = "";

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user.get)
  }

  /**
   * Validates the form
   */
  checkForm(): boolean {
    if (this.name == "") {
      this.setStatusMessage("Brukernavn kan ikke være tom");
      return false;
    }
   
    this.setStatusMessage("");
    return true;
  }

  /**
   * Publishes and registers the user if given arguments are valid
   */
  registerCategory() {
    if (this.checkForm()) {
      // Adds user to database and redirects to the homepage afterwards
      this.postService.addCategory(name).then(status => {
        console.log("Category was added: " + JSON.stringify(status));
        loadCategories();
      }).catch(error => {
        console.log("Error adding category: " + error);
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
