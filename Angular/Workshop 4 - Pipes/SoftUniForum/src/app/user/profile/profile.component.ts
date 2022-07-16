import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: IUser | undefined;

  constructor(private userService: UserService) {
    this.user = this.userService.user;
  }
}
