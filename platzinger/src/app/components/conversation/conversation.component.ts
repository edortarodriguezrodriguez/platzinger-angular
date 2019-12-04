import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {ConversationsService} from "../../services/conversations.service";
import {AuthenticationService} from "../../services/authentication.service";
import {extractMessages} from "@angular/compiler/src/i18n/extractor_merger";
import {AngularFireStorage} from "@angular/fire/storage";

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
  private imgSrc: any = '';
  picture: any;


  constructor(private userService: UserService, private activatedRoot: ActivatedRoute, private conversationService: ConversationsService, private authenticationService: AuthenticationService, private firebaseStorage: AngularFireStorage) {
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

  handleInputChange(event: any) {
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imgSrc = reader.result;
    console.log(this.imgSrc)

    this.sendImage();
  }

  private sendImage() {
    if (this.imgSrc) {
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.imgSrc, 'data_url');

      pictures.then(() => {
        this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();

        this.picture.subscribe((pictureUrl) => {
          console.log(pictureUrl);

          const message = {
            uid: this.conversationId,
            timestamp: Date.now(),
            text: null,
            sender: this.user.uid,
            receiver: this.friendUser.uid,
            url: pictureUrl,
            type: 'image'
          };

          this.conversationService.createConversation(message).then(() => this.textMessage = '')
            .then(() => console.log('conversacion creada correctamente'))
            .catch(() => console.log('error creando conversaciom'));

        }).then(() => console.log('foto en conversacion enviada correctamente')).catch(() => console.log('error subiendo foto'));

      }).catch(()=>{
        console.log('error obteniendo url. ');
      });

    }
  }
}
