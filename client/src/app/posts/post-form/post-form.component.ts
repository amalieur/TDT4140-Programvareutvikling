import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  serializedPost: string = "";
  deserializedPost: Post = new Post();
  
  constructor() { }

  ngOnInit(): void {
    let post = new Post({
      title: "TestAnnonse",
      description: "Beskrivelse",
      timestamp: 1612952332000,
      user: "Admin"
    });

    this.serializedPost = post.serialize();
    this.deserializedPost.deserialize(post.serialize());
  }
}
