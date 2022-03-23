import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router, private activeRoute: ActivatedRoute) { }

  register(email: string, password: string): void {
    this.userService.register(email, password);
    const redirectUrl = [this.activeRoute.snapshot.queryParams['redirect'] || '/'];
    this.router.navigate(redirectUrl);
  }
}
