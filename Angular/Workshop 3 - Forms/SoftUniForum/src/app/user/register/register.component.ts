import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  register(form: NgForm): void {
    if (form.invalid) {
      window.alert('Invalid input!');
      return;
    }

    this.userService.register(form.value).subscribe({
      next: () => {
        const redirectUrl = [this.activeRoute.snapshot.queryParams['redirect'] || '/'];
        this.router.navigate(redirectUrl);
      },
      error: () => {
        window.alert('Something went wrong with user registration...')
      }
    });
  }
}