import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

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
  user = {_id: undefined, username: '', password: '', firstname: '', lastname: '', email: '', phone: ''};
  constructor(private userService: UserService, private router: Router) {
  }

  register() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.verifiedPassword = this.loginForm.value.verifiedPassword;
    if (this.password !== this.verifiedPassword) {
      this.errorFlag = true;
    } else {
          this.userService.createUser(this.user).subscribe((userFromServer: any) => {
            this.user = userFromServer;
            this.user._id = userFromServer._id;
            this.router.navigate(['/user', userFromServer._id]);
          });
    }
  }

  ngOnInit() {
    this.errorFlag = false;
    this.errorMsg = 'Passwords not match!';
  }

}
