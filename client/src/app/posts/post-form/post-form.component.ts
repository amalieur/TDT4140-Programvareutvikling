import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  title: string = "";
  description: string = "";
  price: number = 0;
  categoryid: number;

  constructor(private postService: PostService) { }

  ngOnInit(): void {

  }

  publishPost() {
    let newPost = new Post({
      title: this.title,
      description: this.description,
      timestamp: new Date(),
      owner: "admin",
      imageUrl: "",
      price: this.price,
      categoryid: this.categoryid
    });
    console.log(newPost);
    this.postService.addPost(newPost).then(status => {
      // Flytte til annonsevisning
      console.log("Post was added: " + status);
    }).catch(error => {
      console.log("Error adding post: " + error);
    });
  }
}