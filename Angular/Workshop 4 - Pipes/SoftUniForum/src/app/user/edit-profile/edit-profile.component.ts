import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  user: IUser | undefined;
  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.user;
  }
  editProfileHandler(form: NgForm) {
    console.log(form.valid);
    if (form.invalid) {
      window.alert('Inputs are invalid.');
      return;
    }

    this.userService.updateProfile(form.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (e) => window.alert(e)
    })
  }
}
