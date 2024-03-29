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

  contactUsers: Array<User> = [];
  contactPopup: boolean = false;
  post: Post = new Post();
  owner: User = new User();
  user: User = new User();
  isAdmin: number = 0;
  userId: number = 0;
  isFavourited: boolean = false;
  soldToUser: number = 0;

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private router: Router,
    private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    // Gets current user information
    this.user = this.authService.getCurrentUser(false);

    // If user is logged in, assign userId and isAdmin
    this.userId = this.user.getUserId;
    this.isAdmin = this.user.getIsAdmin;

    // Gets id parameter from URL
    const id = this.activatedRoute.snapshot.params["id"];

    // Gets Post with id from database
    this.postService.getPost(id).then(post => {
      this.post = post;
      // Check if post is favourited
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
   * Navigates to owner's profile
   */
  navigateOwner() {
    this.router.navigateByUrl("/user/" + this.owner.getUserId);
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
    if (this.userId == this.post.getOwner || this.user.getIsAdmin) {
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
      });
    }
  }
  /**
   * Get users in relation postContacted in database and opens popup
   */
  markClosePost() {
    if (this.contactUsers.length <= 0) {
      this.userService.getContactPostUsers(this.post.getId).then(userList => {
        this.contactUsers = userList;
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
      });
    }
  }
  closePopup() {
    this.contactPopup = false;
  }

  /**
   * Add chosen user if any to reviewPost, closes post in database and navigates to profile
   */
  markClosedPost() {
    this.reviewPost();
    this.closePost();
  }
  
  /**
   * Closes post in database and navigates to profile
   */
  closePost() {
    this.contactPopup = false;
    // Check if we are the owner of the post
    if (this.userId == this.post.getOwner) {
      this.post.setStatus = 1;
      this.postService.updatePost(this.post.getId,this.post).then(data => {
        console.log("Successfully closed post: " + this.post.getId);
        this.router.navigateByUrl("/profil");
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
      });
    }
  }

  /**
   * Add user to postContact relation in database
   */
   contactPost() {
    // Check if that we are NOT the owner of the post
    if (this.userId != this.post.getOwner) {
      this.postService.contactPost(this.post.getId,this.user.getUserId).then(data => {
        console.log("Successfully contacted post: " + this.post.getId);
      }).catch(error => {
        console.log(error);
      });
    }
  }

  /**
   * Add user to postReview relation in database
   */
   reviewPost() {
     // Checks that user sold to is NOT the owner of the post
    if (this.userId == this.post.getOwner && this.soldToUser > 0 && this.soldToUser != this.post.getOwner) {
      this.postService.reviewPost(this.post.getId,this.soldToUser, -1, "").then(data => {
        console.log("Successfully added user the post sold to: " + this.post.getId);
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
