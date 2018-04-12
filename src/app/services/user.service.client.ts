import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Http, RequestOptions, Response} from '@angular/http';
import {Router} from '@angular/router';
import {SharedService} from './shared.service';

@Injectable()
export class UserService {
  constructor(private http: Http, private router: Router, private sharedService: SharedService) {
  }

  baseUrl = environment.baseUrl;

  options = new RequestOptions();


  loggedIn() {
    this.options.withCredentials = true;
    return this.http.post(this.baseUrl + '/api/loggedIn', '', this.options)
      .map(
        (res: Response) => {
          const user = res.json();
          if (user !== '0') {
            this.sharedService.user = user; // setting user as global variable using shared service
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
  }


  logout() {
    this.options.withCredentials = true;
    return this.http.post(this.baseUrl + '/api/logout', '', this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }


  register(username: String, password: String) {

    this.options.withCredentials = true;
    const body = {
      username : username,
      password : password
    };

    return this.http.post(this.baseUrl + '/api/register', body, this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  login(username: String, password: String) {

    this.options.withCredentials = true;

    const body = {
      username : username,
      password : password
    };
    return this.http.post(this.baseUrl + '/api/login', body, this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }


  createUser(user) {
    const url = this.baseUrl + '/api/user';
    return this.http.post(url, user).map((response: Response) => {
      return response.json();
    });
  }

  findUserByCredential(username, password) {
    const url = this.baseUrl + '/api/user/?username=' + username + '&password=' + password;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  findUserById(userId) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  findUserByUsername(username) {
    const url = this.baseUrl + '/api/user/?username=' + username;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  updateUser(userId, user) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.put(url, user).map((response: Response) => {
      return response.json();
    });
  }

  deleteUser(userId) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.delete(url).map(
      (res: Response) => {
        return res.json();
    });
  }
}

