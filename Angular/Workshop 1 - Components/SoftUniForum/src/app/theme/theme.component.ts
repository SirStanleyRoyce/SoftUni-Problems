import { Component } from '@angular/core';
import { ContentService } from '../content.service';
import { ITheme } from '../interfaces/theme';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent {
  themes: ITheme[] | undefined;

  constructor(private contentService: ContentService) {
    this.fetchThemes();
  }

  fetchThemes(): void {
    this.themes = undefined;
    this.contentService.getThemes().subscribe(themes => this.themes = themes);
  }
}
