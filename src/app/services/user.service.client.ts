import {User} from '../models/user.model.client';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Http, Response} from '@angular/http';

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  baseUrl = environment.baseUrl;

  createUser(user: User) {
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
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }
}

