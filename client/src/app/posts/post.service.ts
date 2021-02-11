import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postUrl = "api/post/";

  constructor(private http: HttpClient) { }

  getPost(id: string): Promise<Post>{
    return new Promise<Post>(
      (resolve, reject) => {
        this.get_post(id).subscribe((data: any) => {
          try{
            const post = new Post();
            post.deserialize(data);
            resolve(post);
          } catch (err: any) {
            reject(err);
          }
        });
      }
    );
  }

  get_post(id: string) {
    return this.http.get(this.postUrl + id);
  }

  addPost(post: Post): Promise<boolean>{
    return new Promise<boolean>(
      (resolve, reject) => {
        this.add_post(post).subscribe((data: any) => {
          try{
            resolve(data.status);
          } catch (err: any) {
            reject(err);
          }
        });
      }
    );
  }

  add_post(post: Post) {
    return this.http.post(this.postUrl, post.serialize());
  }
}
