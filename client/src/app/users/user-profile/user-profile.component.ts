import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { Post } from 'src/app/models/post.model';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/posts/post.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [
    './user-profile.component.scss',
    '../user-profile/user-profile.component.scss'
  ]
})
export class UserProfileComponent implements OnInit {
  
  allPosts: Array<Post> = [];
  user: User = new User();

  givenReviews: Array<Review> = [];
  notGivenReviews: Array<Review> = [];
  givenReviewPopup: boolean = false;
  receivedReviews: Array<Review> = [];
  receivedReviewPopup: boolean = false;
  constructor(private authService: AuthService, private userService: UserService, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.getPostsByUserId();
  }
  
  showReceivedUserReviews() {
    this.getUserReceivedReviewsByUserId();
    this.receivedReviewPopup = true;
  }
  showGivenUserReviews() {
    this.getUserGivenReviewsByUserId();
    this.givenReviewPopup = true;
  }
  closePopup() {
    this.receivedReviewPopup = false;
    this.givenReviewPopup = false;
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
  /**
   * Gets all given reviews from database
   */
  getUserGivenReviewsByUserId() {
    this.userService.getAllGivenReviews(this.user.getUserId).then(reviews => {
      this.givenReviews = reviews.filter((review: Review) => review.getStars > -1);
      this.notGivenReviews = reviews.filter((review: Review) => review.getStars == -1);
    }).catch(error => {
      console.log(error);
    });
  }
  /**
   * Gets all posts from database, and displays them
   */
  getPostsByUserId() {
    this.postService.getPostsByUserId(this.user.getUserId).then(posts => {
      this.allPosts = posts;
    }).catch(error => {
      console.log(error);
    });
  }

}

