import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  friendId: any;
  friend: User;
  friends: User[];
  price: number = 79.32423432432;
  today: any = Date.now();

  constructor(private userService: UserService, private activatedRoot: ActivatedRoute) {
    this.friendId = this.activatedRoot.snapshot.params['uid'];

    this.friends = this.userService.getFriends();

    this.friend = this.friends.find(record => {
      return record.uid == this.friendId;
    });

    console.log(this.friend);
  }

  ngOnInit() {
  }

}
