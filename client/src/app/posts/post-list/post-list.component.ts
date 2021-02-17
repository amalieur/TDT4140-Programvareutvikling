import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  allPosts: Array<Post> = []

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    // Gets all posts from database, and displays them
    this.postService.getAllPosts().then(posts => {
      this.allPosts = posts;
    }).catch(error => {
      console.log(error);
    });
  }

}
