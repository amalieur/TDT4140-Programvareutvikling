import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postUrl = "api/post/";

  constructor(private http: HttpClient) { }

  getPost(id: number): Promise<Post> {
    return new Promise<Post>(
      (resolve, reject) => {
        this.get_post(id).subscribe((data: any) => {
          try {
            const post = new Post();
            post.deserialize(data.data[0]);
            if (post.getId == 0) {
              reject("Could not find with Post with id: " + id);
            }
            resolve(post);
          } catch (err: any) {
            reject(err);
          }
        });
      }
    );
  }

  private get_post(id: number) {
    return this.http.get(this.postUrl + id);
  }

  addPost(post: Post): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {
        this.add_post(post).subscribe((data: any) => {
          try {
            resolve(data.status);
          } catch (err: any) {
            reject(err);
          }
        });
      }
    );
  }

  private add_post(post: Post) {
    return this.http.post(this.postUrl, post.serialize());
  }
}
