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
  selectedSort: number = 0;

  postMaxPrice: number;
  priceMin: number = 0;
  priceMax: number = 0;

  checked: boolean = false;
  areas: Array<any> = [
    {name: "Agder", checked: false},
    {name: "Innlandet", checked: false}, 
    {name: "Møre og Romsdal", checked: false}, 
    {name: "Nordland", checked: false}, 
    {name: "Oslo", checked: false},
    {name: "Rogaland", checked: false},
    {name: "Troms og Finnmark", checked: false},
    {name: "Trøndelag", checked: false},
    {name: "Vestfold og Telemark", checked: false},
    {name: "Viken", checked: false}
  ];

  constructor(private postService: PostService) { }

  ngOnInit() {
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

    // Gets the maximum price for a post
    this.postService.getMaxPrice(this.selectedCategory).then(maxPrice => {
      this.postMaxPrice = maxPrice;
      if (this.priceMax >= this.postMaxPrice || this.priceMax == 0) {
        this.priceMax = this.postMaxPrice;
      }
    }).catch(error => {
      console.log(error);
    });
  }

  async filterCategory(setMaxPriceRange: boolean = false) {
    // Gets the maximum price for a post
    if (setMaxPriceRange) {
      await this.postService.getMaxPrice(this.selectedCategory).then(maxPrice => {
        this.postMaxPrice = maxPrice;
        this.priceMax = this.postMaxPrice;
        this.priceMin = 0;
      }).catch(error => {
        console.log(error);
      });
    }

    // Gets all posts by selected category
    await this.postService.getPostsByCategory(this.selectedCategory, this.selectedSort, this.priceMin, this.priceMax).then(posts => {
      this.allPosts = posts;
    }).catch(error => {
      console.log(error);
    });
  }

  priceMinChange(){
    if (this.priceMin > this.priceMax) {
      this.priceMin = this.priceMax;
    }

    this.filterCategory();
  }

  priceMaxChange(){
    if (this.priceMax < this.priceMin) {
      this.priceMax = this.priceMin;
    }

    this.filterCategory();
  }

}
