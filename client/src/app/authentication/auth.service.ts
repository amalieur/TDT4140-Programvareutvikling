import { HttpClient, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { tap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

interface IUserLogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = "api/user/login"

  constructor(private http: HttpClient, private router: Router) { }

  login(body: IUserLogin): Promise<string> {
    return new Promise<string>(
      (resolve, reject) => {
        this.login_user(body).subscribe((data: any) => {
          try {
            resolve(data.token);
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
  private login_user(body: IUserLogin) {
    return this.http.post(this.loginUrl, body).pipe(
        tap(res =>this.setSession(res)),
        shareReplay());;
  }
  private setSession(authResult) {
    console.log(authResult);
    localStorage.setItem('token', authResult.token);
  }
  checkTokenExpiration() {
    const token = localStorage.getItem("token");
    if (token) {
      const {iat, exp} = JSON.parse(atob(token?.split(".")[1]));
      if (iat && exp) {
        const issued = new Date(iat*1000);
        const expires = new Date(exp*1000);
        const now = new Date();
        // Expired token
        if (now < issued || now >= expires) {
          this.logout();
          this.router.navigateByUrl("/");
          return false
        }
        return true;
      }
    }
    this.router.navigateByUrl("/")
    return false
  }
  logout() {
    localStorage.removeItem("token");
  }

}
