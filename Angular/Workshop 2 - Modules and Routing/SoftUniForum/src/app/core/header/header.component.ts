import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(private userService: UserService) { }

  get isAuth(): boolean {
    return this.userService.isAuth;
  }

  get username(): string | undefined {
    return this.userService.user?.username;
  };

  logout(): void {
    this.userService.logout();
  }
}