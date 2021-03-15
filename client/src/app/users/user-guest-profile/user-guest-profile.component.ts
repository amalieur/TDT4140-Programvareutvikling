import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-guest-profile',
  templateUrl: './user-guest-profile.component.html',
  styleUrls: ['./user-guest-profile.component.scss']
})
export class UserGuestProfileComponent implements OnInit {

  user: User = new User();
  constructor(private userService: UserService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Gets id parameter from URL
    const id = +this.activatedRoute.snapshot.params["id"];

    // Gets User with id from database
    this.userService.getUser(id).then(user => {
      this.user = user;
    }).catch (error => {
      // Navigate to home on error or invalid userid
      console.log("Error getting user: " + error);
      this.router.navigateByUrl("/");
    });
  }

}
