import {Injectable} from '@angular/core';
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  friends: User[];

  constructor() {

    let myUser: User = {
      nick: 'paco',
      subnick: 'hola',
      age: 30,
      email: 'aa@aa.com',
      friend: false,
      uid: 5
    };

    let myUser1: User = {
      nick: 'maria',
      subnick: 'hola',
      age: 30,
      email: 'aa@aa.com',
      friend: true,
      uid: 1
    };
    let myUser2: User = {
      nick: 'nicki',
      subnick: 'hola',
      age: 30,
      email: 'aa@aa.com',
      friend: true,
      uid: 2
    };
    let myUser3: User = {
      nick: 'patxi',
      subnick: 'hola',
      age: 30,
      email: 'aa@aa.com',
      friend: true,
      uid: 3
    };
    let myUser4: User = {
      nick: 'pacotabaco',
      subnick: 'hola',
      age: 30,
      email: 'aa@aa.com',
      friend: false,
      uid: 4
    };

    this.friends = [myUser, myUser1, myUser2, myUser3, myUser4]

  }

  getFriends() {
    return this.friends;
  }
}
