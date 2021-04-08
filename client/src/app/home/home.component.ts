import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { PostService } from '../posts/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allPosts: Array<Post> = [];
  user: User = new User();
  constructor(private postService: PostService, private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    // Gets current user information
    this.user = this.authService.getCurrentUser(false);
    this.getPosts();
  }

  navigate(url) {
    this.router.navigateByUrl(url);
  }

  getPosts() {
    if (this.user.getUserId != 0) {
      this.postService.getPostsByCategory(undefined, [this.user.getLocation], undefined, undefined, undefined).then(posts => {
        this.allPosts = posts.filter((post: Post) => post.getStatus == 0); // Filter out closed post
      }).catch(error => {
        console.log(error);
      });
    }
  }

}
