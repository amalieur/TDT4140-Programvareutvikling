import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  title: string = "";
  description: string = "";
  price: number = 0;
  categoryid: number = 0;

  statusMessage: string = "";

  categories: Array<Category>;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    // Gets all categories and displays them in dropdown
    this.postService.getAllCategories().then(categories => {
      this.categories = categories;
    }).catch (error => {
      console.log("Error adding catrgories:" + error);
    });
  }

  /**
   * Validates form.
   */
  checkForm(): boolean {
    if (this.title == "") {
      this.setStatusMessage("Tittelen kan ikke være tom");
      return false;
    }
    if (this.description == "") {
      this.setStatusMessage("Beskrivelsen kan ikke være tom");
      return false;
    }
    if (this.price < 0) {
      this.setStatusMessage("Prisen kan ikke være negativ");
      return false;
    }
    if (this.price == null) {
      this.setStatusMessage("Annonsen må ha en pris");
      return false;
    }
    if (this.categoryid < 1) {
      this.setStatusMessage("Annonsen må ha en kategori");
      return false;
    }

    this.setStatusMessage("");
    return true;
  }

  /**
   * Publishes post if it is valid.
   */
  publishPost() {
    if (this.checkForm()) {
      let newPost = new Post({
        title: this.title,
        description: this.description,
        timestamp: new Date(),
        owner: "admin",
        imageUrl: "",
        price: this.price,
        categoryid: this.categoryid
      });

      // Adds post to database and changes page afterwards
      this.postService.addPost(newPost).then(status => {
        console.log("Post was added: " + status);
        this.router.navigateByUrl("/");
      }).catch(error => {
        console.log("Error adding post: " + error);
      });
    }
  }

  /**
   * Sets a status message.
   */
  setStatusMessage(message: string){
    this.statusMessage = message;
  }
}