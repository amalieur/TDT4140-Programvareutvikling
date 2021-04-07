import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postUrl = "api/post/";
  categoryUrl = "api/category/";

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
   * Get all posts in database by specified category.
   */
  getPostsByCategory(categoryId: number): Promise<Array<Post>> {
    return new Promise<Array<Post>>(
      (resolve, reject) => {
        this.get_posts_by_category(categoryId).subscribe((data: any) => {
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

  private get_posts_by_category(categoryId: number) {
    return this.http.get(this.postUrl, {params: {categoryid: String(categoryId)}});
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
}
