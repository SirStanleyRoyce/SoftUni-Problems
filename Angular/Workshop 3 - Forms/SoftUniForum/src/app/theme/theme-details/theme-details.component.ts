import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/content.service';
import { UserService } from 'src/app/user/user.service';
import { IPopulatedTheme } from 'src/app/interfaces/populatedTheme';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';
import { ITheme } from 'src/app/interfaces/theme';
import { IPost } from 'src/app/interfaces/post';

@Component({
  selector: 'app-theme-details',
  templateUrl: './theme-details.component.html',
  styleUrls: ['./theme-details.component.css']
})
export class ThemeDetailComponent {
  theme!: IPopulatedTheme;
  user: IUser | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private contentService: ContentService,
    private userService: UserService
  ) {
    this.fetchTheme();
    this.user = this.userService.user;
  }

  get isAuth(): boolean {
    return this.userService.isAuth;
  }

  get isSubscribed(): boolean {
    return this.theme?.subscribers.includes(this.userService.user!._id) || false;
  }

  fetchTheme(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.contentService.getComments(id).subscribe({
      next: theme => this.theme = theme,
      error: (e) => {
        window.alert('Something went wrong')
        console.error(e)
      }
    });
  }

  commentHandler(form: NgForm): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (form.invalid) {
      window.alert('Invalid comment');
      return;
    }

    this.contentService.commentTheme(id, form.controls['postText'].value).subscribe({
      next: () => {
        form.reset();
        this.fetchTheme();
      },
      error: (e) => {
        window.alert('Something went wrong')
        console.error(e)
      }
    });
  }

  subscribeHandler(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.contentService.subscribeToTheme(id).subscribe({
      next: (res: ITheme) => this.theme.subscribers = res.subscribers,
      error: (e) => {
        window.alert('Something went wrong')
        console.error(e)
      }
    });
  }

  unsubscribeHandler(): void {
    window.alert('sorry, can\'t do');
  }

  hasLiked(id: string): boolean {
    return this.theme!.posts.find(p => p._id === id)!.likes.includes(this.userService.user!._id);
  }

  likeHandler(id: string): void {
    this.contentService.likePost(id).subscribe({
      next: (res: IPost) => {
        // this.theme.posts.find(p => p._id === id)!.likes = res.likes;
        this.theme.posts.find(p => p._id === id)!.likes.push(this.userService.user!._id);
      },
      error: (e) => {
        window.alert('Something went wrong.')
        console.error(e);
      }
    })
  }

  dislikeHandler(id: string): void {
    window.alert('sorry, can\'t do');
  }
}
