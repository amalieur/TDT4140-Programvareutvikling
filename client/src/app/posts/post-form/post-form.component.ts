import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  serializedPost: Object = {};
  deserializedPost: Post = new Post();
  displayPost: Post = new Post();
  
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    let post = new Post({
      id: 0,
      title: "TestAnnonse",
      description: "Beskrivelse",
      timestamp: 1612952332000,
      user: "Admin",
      imageUrl: "url"
    });

    this.serializedPost = post.serialize();
    this.deserializedPost.deserialize(post.serialize());

    this.postService.getPost(0)
    .then((gettedPost: Post) => {
      this.displayPost = gettedPost;
    }).catch((err: any) => {
      console.log(err);
    });
  }
}
