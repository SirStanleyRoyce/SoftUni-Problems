import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) { }

  get isAuth(): boolean {
    return this.userService.isAuth;
  }

  get username(): string | undefined {
    return this.userService.user?.username;
  };

  logout(): void {
    if (this.userService.isAuth) {
      this.userService.logout().subscribe({
        next: () => this.router.navigate(['/']),
        error: () => window.alert('Unsuccessful logout...')
      })
    } else window.alert('You are not authorized for this action.')
  }
}