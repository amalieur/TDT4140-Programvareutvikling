import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: Post = new Post();

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Gets id parameter from URL
    this.activatedRoute.params.subscribe(params => {
      const id = params["id"];

      // Gets Post with id from database
      this.postService.getPost(id).then(post => {
        this.post = post;
      }).catch(error => {
        console.log(error);
      });
    });
  }
}
