import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  user: User;
  userId: String;
  username: String;
  password: String;
  email: String;
  firstName: String;
  lastName: String;


  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  updateUser() {
    this.user._id = this.userId;
    this.user.username = this.loginForm.value.username;
    this.user.email = this.loginForm.value.email;
    this.user.firstName = this.loginForm.value.firstName;
    this.user.lastName = this.loginForm.value.lastName;
    this.userService.updateUser(this.userId, this.user);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // alert('userId is' + this.userId);
      this.user = this.userService.findUserById(params['uid']);
    });
    this.userId = this.user._id;
    this.username = this.user.username;
    this.password = this.user.password;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
  }
}

