import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {ConversationsService} from "../../services/conversations.service";
import {AuthenticationService} from "../../services/authentication.service";
import {extractMessages} from "@angular/compiler/src/i18n/extractor_merger";

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
  private conversation: any[];
  shake: boolean = false;

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

          this.getConversation();
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
      receiver: this.friendUser.uid,
      type: 'text'
    }
    this.conversationService.createConversation(message).then(() => this.textMessage = '');
  }


  sendBuzz() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friendUser.uid,
      type: 'buzz'
    }
    this.conversationService.createConversation(message).then(() => this.textMessage = '');
  }


  private getConversation() {
    this.conversationService.getConversation(this.conversationId).valueChanges().subscribe((data) => {
      console.log(data);
      this.conversation = data;
      this.conversation.forEach((message) => {


        if (!message.seen) {
          message.seen = true;
          this.conversationService.editConversation(message);
          if (message.type == 'text') {
            const audio = new Audio('assets/sound/new_message.m4a');
            audio.play();
          } else if (message.type == 'buzz') {
            this.doBuzz();
          }
        }
      })
    }, (error) => console.log(error));
  }

  private geUserNickById(uid) {
    if (this.friendUser.uid === uid) {
      return this.friendUser.nick;
    } else {
      return this.user.nick;
    }
  }

  private doBuzz() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false
    }, 1000);
  }
}
