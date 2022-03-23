import { Component, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router, private activeRoute: ActivatedRoute) { }

  login(email: string, password: string): void {
    this.userService.login(email, password);
    const redirectUrl = [this.activeRoute.snapshot.queryParams['redirect'] || '/'];
    this.router.navigate(redirectUrl);
  }
}
