import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../app.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: String;
  password: String;
  errorFlag: boolean;
  errorMsg: String;

  constructor(private userService: UserService, private router: Router) {
  }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.userService.findUserByCredential(this.username, this.password)
      .subscribe((user: any) => {
          this.router.navigate(['/user', user._id]); },
      (error: 404) => {
          this.errorFlag = true;
          this.router.navigate(['/login']);
        });
  }

  ngOnInit() {
    this.errorFlag = false;
    this.errorMsg = 'Wrong username or password!';
  }

}
