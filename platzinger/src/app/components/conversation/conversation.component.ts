import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {ConversationsService} from "../../services/conversations.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  friendId: any;
  friendUser: User;
  user: User;
  conversationId: string;
  private textMessage: string;

  constructor(private userService: UserService, private activatedRoot: ActivatedRoute, private conversationService: ConversationsService, private authenticationService: AuthenticationService) {
    this.friendId = this.activatedRoot.snapshot.params['uid'];

    this.userService.getUserById(this.friendId).valueChanges().subscribe((data: User) => {
        this.friendUser = data;
      }, (error) => {
        console.log(error);
      }
    );

    this.authenticationService.getStatus().subscribe((session) =>
      this.userService.getUserById(session.uid).valueChanges().subscribe(
        (user: User) => {
          this.user = user;
          const ids = [this.user.uid, this.friendUser.uid].sort();
          this.conversationId = ids.join('|');
        }
      ));
  }

  ngOnInit() {
  }

  sendMessage() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friendUser.uid
    }
    this.conversationService.createConversation(message).then(() => this.textMessage == '');
  }

}
