import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Post } from '../models/post.model';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postUrl = "api/post/";
  categoryUrl = "api/category/";
  favouriteUrl = "api/post/favourite/";
  contactUrl = "api/post/contact/";
  reviewUrl = "api/post/review/";

  categories: Array<Category>;

  constructor(private http: HttpClient) { }

  /**
   * Get all posts from database.
   */
  getAllPosts(): Promise<Array<Post>> {
    return new Promise<Array<Post>>(
      (resolve, reject) => {
        this.get_all_posts().subscribe((data: any) => {
          try {
            let outputPosts = [];
            for (let post of data.data) {
              outputPosts.push(new Post(post));

              if (!post.id || post.id == 0) {
                reject("Could not deserialize Post");
                return;
              }
            }

            resolve(outputPosts);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private get_all_posts() {
    return this.http.get(this.postUrl);
  }

  /**
   * Get post from database by id.
   */
  getPost(id: number): Promise<Post> {
    return new Promise<Post>(
      (resolve, reject) => {
        this.get_post(id).subscribe((data: any) => {
          try {
            const post = new Post(data.data[0]);
            if (post.getId == 0) {
              reject("Could not find Post with id: " + id);
              return;
            }
            resolve(post);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private get_post(id: number) {
    return this.http.get(this.postUrl + id);
  }

  /**
   * Adds post to database.
   */
  addPost(post: Post): Promise<string> {
    return new Promise<string>(
      (resolve, reject) => {
        this.add_post(post).subscribe((data: any) => {
          try {
            resolve(data.status);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private add_post(post: Post) {
    return this.http.post(this.postUrl, post.serialize());
  }
  /**
   * Adds category to database
   */
   addCategory(category: Category): Promise<string> {
    return new Promise<string>(
      (resolve, reject) => {
        this.add_category(category).subscribe((data: any) => {
          try {
            resolve(data.status);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private add_category(category: Category) {
    return this.http.post(this.categoryUrl, category.serialize());
  }

  /**
   * Get all categories from database.
   */
  getAllCategories(): Promise<Array<Category>>{
    return new Promise<Array<Category>>(
      (resolve, reject) => {
        if (this.categories) {
          resolve(this.categories);
          return;
        }

        this.get_all_categories().subscribe((data: any) => {
          try {
            let outputCategories = [];
            for (let dataCategory of data.data) {
              const category = new Category(dataCategory);
              outputCategories.push(category);
              
              if (category.getCategoryId == 0) {
                reject("Could not deserialize category");
                return;
              }
            }
            
            this.categories = outputCategories;
            resolve(outputCategories);
          } catch (err: any){
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private get_all_categories() {
    return this.http.get(this.categoryUrl);
  }

  /**
   * Delete post in database by id.
   */
  deletePost(id: number): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.delete_post(id).subscribe((data: any) => {
          try {
            resolve(data);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private delete_post(id: number) {
    return this.http.delete(this.postUrl + id);
  }

  /**
   * Update post in database by id.
   */
  updatePost(id: number, post: Post): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.update_post(id, post).subscribe((data: any) => {
          try {
            resolve(data);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private update_post(id: number, post: Post) {
    return this.http.put(this.postUrl + id, post.serialize());
  }

  /**
   * Contact post in database by id.
   */
   contactPost(id: number, userId: number): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.contact_post(id, userId).subscribe((data: any) => {
          try {
            resolve(data);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private contact_post(id: number, userId: number) {
    return this.http.post(this.contactUrl, {id: id, userId: userId});
  }  

  /**
   * Contact post in database by id.
   */
  reviewPost(id: number, userId: number, stars: number, comment: string): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.review_post(id, userId, stars, comment).subscribe((data: any) => {
          try {
            resolve(data);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private review_post(id: number, userId: number, stars: number, comment: string) {
    return this.http.post(this.reviewUrl, {id: id, userId: userId, stars: stars, comment: comment});
  }

  /**
   * Update post in database by id.
   */
  updateReview(review: Review): Promise<any> {
    console.log(review);
    return new Promise<any>(
      (resolve, reject) => {
        this.update_review(review).subscribe((data: any) => {
          try {
            resolve(data);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private update_review(review: Review) {
    return this.http.put(this.reviewUrl, review.serialize());
  }


  /**
   * Get all posts in database by specified category.
   */
  getPostsByCategory(categoryId: number, sort: number, minPrice: number, maxPrice: number): Promise<Array<Post>> {
    return new Promise<Array<Post>>(
      (resolve, reject) => {
        this.get_posts_by_category(categoryId, sort, minPrice, maxPrice).subscribe((data: any) => {
          try {
            let outputPosts = [];
            for (let post of data.data) {
              outputPosts.push(new Post(post));
              
              if (!post.id || post.id == 0) {
                reject("Could not deserialize Post");
                return;
              }
            }

            resolve(outputPosts);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private get_posts_by_category(categoryId: number, sort: number, minPrice: number, maxPrice: number) {
    return this.http.get(this.postUrl, {params: {categoryid: String(categoryId), sort: String(sort), min_price: String(minPrice), max_price: String(maxPrice)}});
  }

  /**
   * Get all posts in database by specified category.
   */
  getMaxPrice(categoryId: number = undefined): Promise<number> {
    return new Promise<number>(
      (resolve, reject) => {
        this.get_max_price(categoryId).subscribe((data: any) => {
          try {
            resolve(data.data[0].maxPrice);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private get_max_price(categoryId: number) {
    return this.http.get(this.postUrl + "max", {params: {categoryid: String(categoryId)}});
  }

  /**
   * Get all posts in database by specified user.
   */
   getPostsByUserId(userId: number): Promise<Array<Post>> {
    return new Promise<Array<Post>>(
      (resolve, reject) => {
        this.get_posts_by_user_id(userId).subscribe((data: any) => {
          try {
            let outputPosts = [];
            for (let post of data.data) {
              outputPosts.push(new Post(post));
              
              if (!post.id || post.id == 0) {
                reject("Could not deserialize Post");
                return;
              }
            }
            resolve(outputPosts);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private get_posts_by_user_id(userId: number) {
    return this.http.get(this.postUrl, {params: {userId: String(userId)}});
  }

  /**
   * Check favourite status in database by id.
   */
   getFavourite(id: number, userId: number): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.get_favourite(id, userId).subscribe((data: any) => {
          try {
            let favourited = false;
            if (data?.data[0]?.favourited == 1) {
              favourited = true;
            }
            resolve(favourited);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private get_favourite(id: number, userId: number) {
    return this.http.get(this.favouriteUrl + id + "/" + userId);
  }

  /**
   * Delete favourite in database by id.
   */
  addFavourite(id: number, userId: number): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.add_favourite(id, userId).subscribe((data: any) => {
          try {
            resolve(data);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private add_favourite(id: number, userId: number) {
    return this.http.post(this.favouriteUrl, {id: id, userId: userId});
  }

  /**
   * Delete favourite in database by id.
   */
   deleteFavourite(id: number, userId: number): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.delete_favourite(id, userId).subscribe((data: any) => {
          try {
            resolve(data);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private delete_favourite(id: number, userId: number) {
    return this.http.delete(this.favouriteUrl + id + "/" + userId);
  }

  /**
   * Delete favourite in database by id.
   */
  getFavouritedPosts(userId: number): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.get_favourited_posts(userId).subscribe((data: any) => {
          try {
            let outputPosts = [];
            for (let post of data.data) {
              outputPosts.push(new Post(post));
              
              if (!post.id || post.id == 0) {
                reject("Could not deserialize Post");
                return;
              }
            }
            resolve(outputPosts);
          } catch (err: any) {
            reject(err);
          }
        },
        (err: any) => {
          console.log(err.message);
          reject(err);
        });
      }
    );
  }

  private get_favourited_posts(userId: number) {
    return this.http.get(this.favouriteUrl+userId);
  }
}
