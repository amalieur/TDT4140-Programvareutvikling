import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './authentication/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'client';
  user: User;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit() {
    this.user = this.authService.getCurrentUser(false);
    this.userSubscription = this.authService.userObservable.subscribe(user => {
      this.user = user;
    });
  }

  navigate(url) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.authService.logout();
  }
}
