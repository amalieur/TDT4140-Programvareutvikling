import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  id = 0;

  title: string = "";
  description: string = "";
  price: number = 0;
  categoryid: number = 0;
  imageUrl: string;
  displayImageUrl: string;

  statusMessage: string = "";

  categories: Array<Category>;

  constructor(private postService: PostService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params["id"];
    if (id) {
      this.id = id;

      // Gets Post with id from database
      this.postService.getPost(id).then(post => {
        this.title = post.getTitle;
        this.description = post.getDescription;
        this.price = post.getPrice;
        this.categoryid = post.getCategory;
        this.imageUrl = post.getImageUrl;

        this.showImage(this.imageUrl);
      }).catch(error => {
        console.log(error);
      });
    }

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
        imageUrl: this.imageUrl,
        price: this.price,
        categoryid: this.categoryid
      });

      if (this.id) {
        // Updates post with id in database and changes page afterwards
        this.postService.updatePost(this.id, newPost).then(status => {
          console.log("Post was added: " + status);
          this.router.navigateByUrl("/annonse");
        }).catch(error => {
          console.log("Error adding post: " + error);
        });
      } else {
        // Adds post to database and changes page afterwards
        this.postService.addPost(newPost).then(status => {
          console.log("Post was added: " + status);
          this.router.navigateByUrl("/annonse");
        }).catch(error => {
          console.log("Error adding post: " + error);
        });
      }
    }
  }

  /**
   * Deletes post in database and navigates to post list. 
   * Post can only be deleted if we are updating, not adding.
   */
  deletePost() {
    if (this.id) {
      this.postService.deletePost(this.id).then(data => {
        console.log("Successfully deleted post: " + this.id);
        this.router.navigateByUrl("/annonse");
      }).catch(error => {
        console.log(error);
      });
    }
  }

  /**
   * Sets the image source to be the url.
   */
  showImage(url) {
    this.displayImageUrl = url;
  }

  /**
   * Sets a status message.
   */
  setStatusMessage(message: string) {
    this.statusMessage = message;
  }
}