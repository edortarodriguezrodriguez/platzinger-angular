import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RequestsService} from "../../services/requests.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  friends: User[];
  query: string;
  private user: User;
  closeResult: string;
  friendEmail: string;


  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router, private modalService: NgbModal, private requestService: RequestsService) {
    this.getUsers();
    this.getUserSession();
  }

  private getUsers() {
    this.userService.getUsers().valueChanges().subscribe((data: User[]) => {
      this.friends = data;
    }, (error) => {
      console.log(error);
    });
  }

  logout() {
    this.authenticationService.logout().then((data) => {
      alert('sesion cerrada');
      this.router.navigate(['login']);
    }).catch((error) => console.log());
  }

  ngOnInit() {
  }

  private getUserSession() {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe(
        (user: User) => this.user = user,
        (error) => {
          console.log(error);
        })
    }, (error) => {
      console.log(error);
    })
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  private sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    }

    this.requestService.createRequest(request).then(() => alert('solicitud enviada')).catch(() => console.log('error'));

  }
}
