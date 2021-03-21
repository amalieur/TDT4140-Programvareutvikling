import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/posts/post.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  allPosts: Array<Post> = [];
  user: User = new User();
  constructor(private authService: AuthService, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.getPostsByUserId();
  }
  placeholder() {
    console.log(":)");
  }
  getPostsByUserId() {
    // Gets all posts from database, and displays them
    this.postService.getPostsByUserId(this.user.getUserId).then(posts => {
      this.allPosts = posts;
    }).catch(error => {
      console.log(error);
    });
  }
}
