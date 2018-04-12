import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';


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

  constructor(private userService: UserService, private router: Router, private sharedService: SharedService) {
  }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.userService.login(this.username, this.password)
      .subscribe((user: any) => {
          this.sharedService.user = user;
          this.errorFlag = false;
          this.router.navigate(['/user']); },
      (error: any) => {
          this.errorFlag = true;
          this.router.navigate(['/login']);
        });
  }

  ngOnInit() {
    this.errorFlag = false;
    this.errorMsg = 'Wrong username or password!';
  }

}
