import { Component } from '@angular/core';
import { ContentService } from './content.service';
import { IPost } from './interfaces/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: IPost[] | undefined;
  isAuthorized: boolean = false;

  constructor(private contentService: ContentService) {
    this.fetchThemes();
  }

  fetchThemes(): void {
    this.posts = undefined;
    this.contentService.getPosts().subscribe(posts => this.posts = posts);
  }

  
}
