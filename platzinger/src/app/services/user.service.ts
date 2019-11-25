import {Injectable} from '@angular/core';
import {Status, User} from "../interfaces/user";

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
      uid: 5,
      status :  Status.Online
    };

    let myUser1: User = {
      nick: 'maria',
      subnick: 'hola',
      age: 30,
      email: 'aa@aa.com',
      friend: true,
      uid: 1,
      status :  Status.Offline
    };
    let myUser2: User = {
      nick: 'nicki',
      subnick: 'hola',
      age: 30,
      email: 'aa@aa.com',
      friend: true,
      uid: 2,
      status :  Status.Away
    };
    let myUser3: User = {
      nick: 'patxi',
      subnick: 'hola',
      age: 30,
      email: 'aa@aa.com',
      friend: true,
      uid: 3,
      status :  Status.Busy
    };
    let myUser4: User = {
      nick: 'pacotabaco',
      subnick: 'hola',
      age: 30,
      email: 'aa@aa.com',
      friend: false,
      uid: 4,
      status :  Status.Busy
    };

    this.friends = [myUser, myUser1, myUser2, myUser3, myUser4]

  }

  getFriends() {
    return this.friends;
  }
}
