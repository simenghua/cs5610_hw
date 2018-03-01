import {User} from '../models/user.model.client';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  users: User[] = [
    new User('123', 'alice', 'qq', '', '', ''),
    new User('234', 'bob', 'qq', '', '', ''),
    new User('345', 'charlie', 'qq', '', '', ''),
    new User('456', 'jannunzi', 'qq', '', '', '')
  ];

  createUser(user: User) {
    user._id = '' + Math.round(Math.random() * 1000);
    this.users.push(user);
  }

  findUserByCredential(username: String, password: String) {
    return this.users.find(function (user) {
      return user.username === username && user.password === password;
    });
  }

  findUserById(userId: String) {
    return this.users.find(function (user) {
      return user._id === userId;
    });
  }

  updateUser(userId, user: User) {
    const targetuser = this.findUserById(userId);
    targetuser.username = user.username;
    targetuser.lastName = user.lastName;
    targetuser.email = user.email;
    targetuser.firstName = user.firstName;
  }

  deleteUser(user: User) {
    for (const i in this.users) {
      if (this.users[i]._id === user._id) {
        const j = +i;
        this.users.splice(j, 1);
      }
    }
  }
}
