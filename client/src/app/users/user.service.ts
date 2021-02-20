import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = "api/user/"

  constructor(private http: HttpClient) { }

  /**
   * Adds user to database.
   */
  addUser(user: User): Promise<string> {
    return new Promise<string>(
      (resolve, reject) => {
        this.add_user(user).subscribe((data: any) => {
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

  private add_user(user: User) {
    return this.http.post(this.userUrl, user.serialize());
  }

  /**
   * Get post from database by id.
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
}
