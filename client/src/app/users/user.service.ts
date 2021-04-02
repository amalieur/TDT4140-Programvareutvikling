import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

interface IUserLogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = "api/user/";
  contactUrl = "api/post/contact/";

  constructor(private http: HttpClient) { }

  /**
   * Get an user from the database by id.
   */
  getUser(id: number): Promise<User> {
    return new Promise<User>(
      (resolve, reject) => {
        this.get_user(id).subscribe((data: any) => {
          try {
            const user = new User(data.data[0]);
            if (user.getUserId == 0) {
              reject("Could not find User with id: " + id);
              return;
            }
            resolve(user);
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
  private get_user(id: number) {
    return this.http.get(this.userUrl + id);
  }

  /**
   * Get all users from database.
   */
  getAllUsers(): Promise<Array<User>> {
    return new Promise<Array<User>>(
      (resolve, reject) => {
        this.get_all_users().subscribe((data: any) => {
          try {
            let outputUsers = []; // array of users
            for (let user of data.data) {
              outputUsers.push(new User(user));

              if (user.getId == 0) {
                reject("Could not deserialize User");
                return;
              }
            }
            resolve(outputUsers);
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
  private get_all_users() {
    return this.http.get(this.userUrl);
  }

  /**
   * Get all users relating to contact post given postId from database.
   */
   getContactPostUsers(postId: number): Promise<Array<User>> {
    return new Promise<Array<User>>(
      (resolve, reject) => {
        this.get_contact_post_users(postId).subscribe((data: any) => {
          try {
            let outputUsers = []; // array of users
            for (let user of data.data) {
              outputUsers.push(new User(user));

              if (user.getId == 0) {
                reject("Could not deserialize User");
                return;
              }
            }
            resolve(outputUsers);
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
  private get_contact_post_users(postId: number) {
    return this.http.get(this.contactUrl+postId);
  }

  /**
   * Deletes an user from the database by id.
   */
   deleteUser(id: number): Promise<User> {
    return new Promise<User>(
      (resolve, reject) => {
        this.delete_user(id).subscribe((data: any) => {
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
  private delete_user(id: number) {
    return this.http.delete(this.userUrl + id);
  }
  
  // /api/user/:userId
  updateUser(user: User, userId: number): Promise<string> {
    return new Promise<string>(
      (resolve, reject) => {
        this.update_user(user, userId).subscribe((data: any) => {
          try {
            resolve(data.data);
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
  private update_user(user: User, userId: number) {
    return this.http.put(this.userUrl + userId, user.serialize());
  }
}
