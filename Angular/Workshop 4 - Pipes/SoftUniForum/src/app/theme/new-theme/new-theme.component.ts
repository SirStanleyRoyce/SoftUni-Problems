import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/content.service';
import { ITheme } from 'src/app/interfaces/theme';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css']
})
export class NewThemeComponent {
  constructor(private contentService: ContentService, private router: Router) { }

  newThemeHandler(form: NgForm) {
    console.log(form.valid);
    if (form.invalid) {
      window.alert('Invalid Theme.');
      return;
    }

    this.contentService.newTheme(form.value).subscribe({
      next: (theme: ITheme) => this.router.navigate(['/themes', theme._id]),
      error: (e) => {
        window.alert('Something went wrong');
        console.error(e);
      }
    })
  }
}
