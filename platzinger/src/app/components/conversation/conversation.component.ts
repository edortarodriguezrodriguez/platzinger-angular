import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  friendId: any;

  constructor(private activatedRoot: ActivatedRoute) {
    this.friendId = this.activatedRoot.snapshot.params['uid'];
    console.log(this.friendId);
  }

  ngOnInit() {
  }

}
