import { Component, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('form') form!: NgForm;

  constructor(private userService: UserService, private router: Router, private activeRoute: ActivatedRoute) { }

  login(username: string, password: string): void {
    if (this.form.invalid) {
      window.alert('Invalid input!');
      return;
    }

    this.userService.login(username, password).subscribe({
      next: () => {
        const redirectUrl = [this.activeRoute.snapshot.queryParams['redirect'] || '/'];
        this.router.navigate(redirectUrl);
      },
      error: () => window.alert('Couldn\'t log in...')
    });
  }
}