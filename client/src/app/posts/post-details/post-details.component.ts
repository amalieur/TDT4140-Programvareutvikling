import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: Post = new Post();
  owner: User = new User();
  user: User = new User();
  isAdmin: number = 0;
  userId: number = 0;
  isFavourited: boolean = false;
  constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private router: Router,
              private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    // Gets current user information
    this.user = this.authService.getCurrentUser(false);
    
    // If user is logged in, assign userId and isAdmin
    this.userId = this.user.getUserId; // 0
    this.isAdmin = this.user.getIsAdmin; // 0

    // Gets id parameter from URL
    const id = this.activatedRoute.snapshot.params["id"];

    // Gets Post with id from database
    this.postService.getPost(id).then(post => {
      this.post = post;

      // Checks for user favourite
      this.checkFavourite();

      // Gets Post owner from database
      this.userService.getUser(this.post.getOwner).then(user => {
        this.owner = user;
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  }
  
  /**
   * Moves to edit page
   */
  editPost() {
    this.router.navigateByUrl("/annonse/rediger/" + this.post.getId);
  }

  /**
   * Deletes post in database and navigates to post list
   */
  deletePost() {
    // Check if we are the owner of the post
    if (this.userId == this.post.getOwner) {
      this.postService.deletePost(this.post.getId).then(data => {
        console.log("Successfully deleted post: " + this.post.getId);
        this.router.navigateByUrl("/annonse");
      }).catch(error => {
        console.log(error);
      });
    }
  }

  /**
   * Add post to favourites in database
   */
  addFavourite() {
    // Check if user is not the owner of the post
    if (this.userId != this.post.getOwner) {
      this.postService.addFavourite(this.post.getId, this.userId).then(data => {
        console.log("Successfully added post to favourites: " + this.post.getId);
        this.isFavourited = true;
      }).catch(error => {
        console.log(error);
      });
    }
  }
  /**
   * Check if post is favourited in database
   */
  checkFavourite() {
    // Check if user is not the owner of the post
    if (this.userId != this.post.getOwner) {
      this.postService.getFavourite(this.post.getId, this.userId).then(data => {
        console.log("Successfully received post from favourites: " + this.post.getId);
        this.isFavourited = data;
      }).catch(error => {
        console.log(error);
      });
    }
  }
  /**
   * Remove post from favourites in database
   */
   removeFavourite() {
    // Check if user is not the owner of the post
    if (this.userId != this.post.getOwner) {
      this.postService.deleteFavourite(this.post.getId, this.userId).then(data => {
        console.log("Successfully removed post from favourites: " + this.post.getId);
        this.isFavourited = false;
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
