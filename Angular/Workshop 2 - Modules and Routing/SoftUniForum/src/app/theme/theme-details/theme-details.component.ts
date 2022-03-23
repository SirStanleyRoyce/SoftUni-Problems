import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/content.service';
import { UserService } from 'src/app/user/user.service';
import { ICommonUserData } from 'src/app/interfaces/commonUserData';
import { IPopulatedTheme } from 'src/app/interfaces/populatedTheme';

@Component({
  selector: 'app-theme-details',
  templateUrl: './theme-details.component.html',
  styleUrls: ['./theme-details.component.css']
})
export class ThemeDetailComponent {
  theme: IPopulatedTheme | undefined;
  user: ICommonUserData | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private contentService: ContentService,
    private userService: UserService
  ) {
    this.fetchTheme();
    this.user = userService.user;
  }

  get isAuth(): boolean {
    return this.userService.isAuth;
  }

  fetchTheme(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.contentService.getComments(id)?.subscribe(theme => this.theme = theme);
  }
}
