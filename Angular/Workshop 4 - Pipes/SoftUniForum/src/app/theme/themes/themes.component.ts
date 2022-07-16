import { Component } from '@angular/core';
import { IPost } from 'src/app/interfaces/post';
import { UserService } from 'src/app/user/user.service';
import { ContentService } from '../../content.service';
import { ITheme } from '../../interfaces/theme';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent {
  themes: ITheme[] | undefined;
  posts: IPost[] | undefined;

  constructor(
    private contentService: ContentService,
    private userService: UserService
  ) {
    this.fetchThemes();
    this.fetchPosts();
  }

  get isAuth(): boolean {
    return this.userService.isAuth;
  }

  fetchThemes(): void {
    this.themes = undefined;
    this.contentService.getThemes()?.subscribe(themes => this.themes = themes);
  }

  fetchPosts(): void {
    this.posts = undefined;
    this.contentService.getPosts(5)?.subscribe(posts => this.posts = posts);
  }

  isSubscribed(id: string): boolean {
    return this.themes!.find(t => t._id === id)!.subscribers.includes(this.userService.user!._id)
  }

  subscribeHandler(id: string): void {
    this.contentService.subscribeToTheme(id).subscribe({
      next: (res: ITheme) => this.themes!.find(t => t._id === id)!.subscribers = res.subscribers,
      error: (e) => {
        window.alert('Something went wrong')
        console.error(e)
      }
    });
  }

  unsubscribeHandler(id: string): void {
    window.alert('sorry, can\'t do');
  }
}
