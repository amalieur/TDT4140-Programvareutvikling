import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = "api/post/"

  constructor(private http: HttpClient) { }

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
