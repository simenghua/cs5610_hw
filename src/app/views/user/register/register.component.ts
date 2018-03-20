import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../app.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: String;
  password: String;
  verifiedPassword: String;
  errorFlag: boolean;
  errorMsg: String;

  constructor(private userService: UserService, private router: Router) {
  }

  register() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.verifiedPassword = this.loginForm.value.verifiedPassword;
    if (this.password !== this.verifiedPassword) {
      this.errorFlag = true;
    } else {
      const user = new User('', this.username, this.password, '', '', '');
      this.userService.createUser(user).subscribe((returnUser: User) => {
        this.router.navigate(['/user', returnUser._id]);
      });
    }
  }

  ngOnInit() {
    this.errorFlag = false;
    this.errorMsg = 'Passwords not match!';
  }

}
