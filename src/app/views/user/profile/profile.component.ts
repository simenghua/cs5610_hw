import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../app.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  userId: String;
  user: User;
  username: String;
  email: String;
  firstName: String;
  lastName: String;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      return this.userService.findUserById(params['uid']).subscribe(
        (returnUser: User) => {
          this.userId = params['uid'];
          this.user = returnUser;
          this.username = this.user.username;
          this.email = this.user.email;
          this.firstName = this.user.firstName;
          this.lastName = this.user.lastName;
          this.email = this.user.email;
        }
      );
    });

  }

  update() {
    this.user.username = this.loginForm.value.username;
    this.user.firstName = this.loginForm.value.firstName;
    this.user.lastName = this.loginForm.value.lastName;
    this.user.email = this.loginForm.value.email;
    this.userService.updateUser(this.userId, this.user).subscribe((returnUser: User) => {
      this.router.navigate(['/user', returnUser._id]);
    });
  }

  delete() {
    this.userService.deleteUser(this.userId).subscribe((returnUser: User) => {
      this.router.navigate(['/login']);
    });
  }
}
