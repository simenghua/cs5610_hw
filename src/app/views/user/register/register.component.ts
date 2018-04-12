import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

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
  constructor(private userService: UserService, private router: Router, private sharedService: SharedService) {
  }

  register() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.verifiedPassword = this.loginForm.value.verifiedPassword;
    if (this.password !== this.verifiedPassword) {
      this.errorFlag = true;
    } else {
          this.userService.register(this.username, this.password).subscribe(
            (userFromServer: any) => {
            // this.user = userFromServer;
            // this.user._id = this.sharedService.user['_id'];
            this.errorFlag = false;
            this.router.navigate(['/user']);
          },
            (error: any) => {
            this.errorFlag = true;
            });
    }
  }

  ngOnInit() {
    this.errorFlag = false;
    this.errorMsg = 'Passwords not match!';
  }

}
