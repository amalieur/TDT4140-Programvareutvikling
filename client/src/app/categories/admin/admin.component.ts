import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/posts/post.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user: User = new User();
  categories: Array<Category> = [];
  name: string = "";
  statusMessage: string = "";

  constructor(private postService: PostService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Restrict page load to logged in admin users only
    this.user = this.authService.getCurrentUser();
    if (!this.user.getIsAdmin) {
      this.router.navigateByUrl("/");
    }
    this.loadCategories();
  }

  /**
   * Validates the form
   */
  checkForm(): boolean {
    if (this.name == "") {
      this.setStatusMessage("Kategorinavn kan ikke være tom");
      return false;
    }
   
    this.setStatusMessage("");
    return true;
  }

  /**
   * Publishes and add category if given arguments are valid
   */
  addCategory() {
    if (this.checkForm()) {
      const category: Category = new Category(
        {
          id: 0,
          name: this.name,
        }
      );
      // Adds user to database and redirects to the homepage afterwards
      this.postService.addCategory(category).then(status => {
        console.log("Category was with name: " + this.name+ " was added!");
        this.loadCategories();
        this.categories.push(category);
        this.name = ""; // Reset input
      }).catch(error => {
        console.log("Error adding category: " + error);
      });
    }
  }

  /*
   * Get the categories from database
   */
  loadCategories() {
    // Gets all categories from database and displays them
    this.postService.getAllCategories().then(categories => {
      console.log(categories);
      this.categories = categories;
    }).catch(error => {
      console.log(error);
    });
  }

  /**
   * Sets the status message for user feedback on form submit
   */
  setStatusMessage(message: string) {
    this.statusMessage = message;
  }
}
