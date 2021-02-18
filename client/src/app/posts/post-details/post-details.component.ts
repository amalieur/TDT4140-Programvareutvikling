import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: Post = new Post();

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Gets id parameter from URL
    const id = this.activatedRoute.snapshot.params["id"];

    // Gets Post with id from database
    this.postService.getPost(id).then(post => {
      this.post = post;
    }).catch(error => {
      console.log(error);
    });
  }

  deletePost() {
    // Deletes post in database and navigates to post list
    this.postService.deletePost(this.post.getId).then(data => {
      console.log("Successfully deleted post: " + this.post.getId);
      this.router.navigateByUrl("/annonse");
    }).catch(error => {
      console.log(error);
    });
  }
}
