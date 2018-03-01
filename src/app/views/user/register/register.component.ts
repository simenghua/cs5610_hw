import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: String; // see usage as two-way data binding
  password: String; // see usage as two-way data binding
  verifiedPassword: String;
  errorFlag: boolean;
  errorMsg = 'Password mismatch';

  constructor(private userService: UserService, private router: Router) {
  }

  register() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.verifiedPassword = this.loginForm.value.verifiedPassword;
    // alert(this.username);
    if (this.verifiedPassword !== this.password) {
      this.errorFlag = true;
    } else {
      const user = new User('', this.username, this.password, '', '', '');
      this.userService.createUser(user);
      this.router.navigate(['/user', user._id]);
    }
  }

  ngOnInit() {
  }

}
