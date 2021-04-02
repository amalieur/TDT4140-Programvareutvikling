import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  allPosts: Array<Post> = [];
  categories: Array<Category> = [];

  selectedCategory: number;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    // Gets all categories from database and displays them in dropdown
    this.postService.getAllCategories().then(categories => {
      this.categories = categories;
    }).catch(error => {
      console.log(error);
    });

    this.getPosts();
  }

  getPosts() {
    // Gets all posts from database, and displays them
    this.postService.getAllPosts().then(posts => {
      this.allPosts = posts.filter((post: Post) => post.getStatus == 0); // Filter out closed post
    }).catch(error => {
      console.log(error);
    });
  }

  filterCategory() {
    if (this.selectedCategory > 0) {
      // Gets all posts by selected category
      this.postService.getPostsByCategory(this.selectedCategory).then(posts => {
        this.allPosts = posts;
      }).catch(error => {
        console.log(error);
      });
    } else {
      this.getPosts();
    }
  }

}
