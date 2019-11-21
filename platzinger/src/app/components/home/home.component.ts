import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
    let myUser: User = {
      nick: 'burdaich',
      subnick: 'hola',
      age: 30,
      email: 'aa@aa.com',
      friend: true,
      uid: 1
    };

    console.log(myUser);

    let users: User  []
      = [myUser];

  }

  ngOnInit() {
  }

}
