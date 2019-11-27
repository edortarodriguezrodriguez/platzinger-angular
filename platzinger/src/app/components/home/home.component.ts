import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  friends: User[];
  query: string;
  private user: User;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) {
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
}
