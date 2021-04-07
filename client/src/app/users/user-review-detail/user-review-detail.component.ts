import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/review.model';
import { PostService } from 'src/app/posts/post.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-review-detail',
  templateUrl: './user-review-detail.component.html',
  styleUrls: ['./user-review-detail.component.scss']
})
export class UserReviewDetailComponent implements OnInit {

  @Input()
  review: Review = new Review();
  @Input()
  editable: boolean = false;

  stars: number = Math.floor(this.review.getStars);
  comment: string = this.review.getComment;
  constructor(private userService: UserService, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.comment = this.review.getComment;
    this.stars = Math.floor(this.review.getStars);
  }

  updateStars(stars: number) {
    if (this.editable) {
      this.review.setStars = stars;
      this.stars = Math.floor(this.review.getStars);
    }
  }

  /**
   * Give user reviews in database
   */
  updateReview() {
    if (this.review.getStars > 0) {
      this.review.setComment = this.comment;
      this.postService.updateReview(this.review).then(data => {
        console.log("Successfully given review to post: " + this.review.getId);
      }).catch(error => {
        console.log(error);
      });
    }
  }

}
