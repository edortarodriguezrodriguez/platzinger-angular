import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  friends: User [];

  constructor() {
    let myUser: User = {
      nick: 'paco',
      subnick: 'hola',
      age: 30,
      email: 'aa@aa.com',
      friend: true,
      uid: 1
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
      uid: 1
    };
    let myUser3: User = {
      nick: 'patxi',
      subnick: 'hola',
      age: 30,
      email: 'aa@aa.com',
      friend: true,
      uid: 1
    };
    let myUser4: User = {
      nick: 'pacotabaco',
      subnick: 'hola',
      age: 30,
      email: 'aa@aa.com',
      friend: true,
      uid: 1
    };


    this.friends = [myUser, myUser1, myUser2, myUser3, myUser4]


    console.log(myUser);

    let users: User  []
      = [myUser];

  }

  ngOnInit() {
  }

}
