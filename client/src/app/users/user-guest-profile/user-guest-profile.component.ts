import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/authentication/auth.service';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { PostService } from 'src/app/posts/post.service';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-user-guest-profile',
  templateUrl: './user-guest-profile.component.html',
  styleUrls: ['./user-guest-profile.component.scss']
})
export class UserGuestProfileComponent implements OnInit {

  user: User = new User();
  userPosts: Array<Post> = [];
  receivedReviews: Array<Review> = [];
  receivedReviewPopup: boolean = false;
  
  constructor(private userService: UserService, private authService: AuthService, private postService: PostService, private activatedRoute: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    // Gets id parameter from URL
    const id = +this.activatedRoute.snapshot.params["id"];

    // Gets User with id from database
    this.userService.getUser(id).then(user => {
      this.user = user;
      // Redirects to /profile if the user is accessing their own profile
      const currentUser: User = this.authService.getCurrentUser();
      if (currentUser.getUserId == this.user.getUserId) {
        this.router.navigateByUrl("/profil");
      } else {
        this.getPosts();
      }
    }).catch (error => {
      // Navigate to home on error or invalid userid
      console.log("Error getting user: " + error);
      this.router.navigateByUrl("/");
    });
  }

  getPosts() {
    // Gets all posts from database, and displays them
    this.postService.getPostsByUserId(this.user.getUserId).then(posts => {
      this.userPosts = posts;
      console.log(this.userPosts,[this.user.getUserId]);
    }).catch(error => {
      console.log(error);
    });
  }

  showReceivedUserReviews() {
    this.getUserReceivedReviewsByUserId();
    this.receivedReviewPopup = true;
  }
  closePopup() {
    this.receivedReviewPopup = false;
  }
  /**
   * Gets all received reviews from database
   */
   getUserReceivedReviewsByUserId() {
    this.userService.getAllReceivedUserReviews(this.user.getUserId).then(reviews => {
      this.receivedReviews = reviews;
    }).catch(error => {
      console.log(error);
    });
  }
}
