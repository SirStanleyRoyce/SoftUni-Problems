import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuth: boolean;

  constructor() {
    this.isAuth = false;
  }

  login(): void {
    this.isAuth = true;
  }

  logout(): void {
    this.isAuth = false;
  }
}