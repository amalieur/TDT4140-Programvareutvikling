import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postUrl = "api/post/";

  constructor(private http: HttpClient) { }

  /**
   * Get post from database by id.
   */
  getPost(id: number): Promise<Post> {
    return new Promise<Post>(
      (resolve, reject) => {
        this.get_post(id).subscribe((data: any) => {
          try {
            const post = new Post();
            post.deserialize(data.data[0]);
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
}
