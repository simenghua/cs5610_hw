import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../app.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  userId: String;
  user: any;
  username: String;
  email: String;
  firstName: String;
  lastName: String;
  phone: String;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      return this.userService.findUserById(params['uid']).subscribe(
        (returnUser: any) => {
          this.userId = params['uid'];
          this.user = returnUser;
          this.username = this.user.username;
          this.email = this.user.email;
          this.firstName = this.user.firstName;
          this.lastName = this.user.lastName;
          this.phone = this.user.phone;
        }
      );
    });

  }

  update() {
    this.user.username = this.loginForm.value.username;
    this.user.firstName = this.loginForm.value.firstName;
    this.user.lastName = this.loginForm.value.lastName;
    this.user.email = this.loginForm.value.email;
    this.user.phone = this.loginForm.value.phone;
    this.userService.updateUser(this.userId, this.user).subscribe((returnUser: any) => {
      this.user = returnUser;
      this.router.navigate(['.'], {relativeTo: this.activatedRoute});
    });
  }

  delete() {
    this.userService.deleteUser(this.userId).subscribe((returnUser: any) => {
      this.router.navigate(['/login']);
    });
  }
}
