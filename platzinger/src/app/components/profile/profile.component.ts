import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private authenticationService: AuthenticationService) {
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

  ngOnInit() {
  }

  saveSettings() {
    this.userService.editUser(this.user).then(
      (data) => {
        alert('cambios guardados correctamente');
      }).catch((error) => {
      console.log(error);
    });
  }
}
