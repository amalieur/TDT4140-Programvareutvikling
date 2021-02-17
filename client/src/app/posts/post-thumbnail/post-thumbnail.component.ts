import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-thumbnail',
  templateUrl: './post-thumbnail.component.html',
  styleUrls: ['./post-thumbnail.component.scss']
})
export class PostThumbnailComponent implements OnInit {

  @Input()
  post: Post = new Post();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPost() {
    this.router.navigateByUrl("annonse/" + this.post.getId);
  }
}
