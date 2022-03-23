import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from './interfaces/post';
import { ITheme } from './interfaces/theme';

import { environment } from 'src/environments/environment';
const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private http: HttpClient) { }

  getThemes() {
    return this.http.get<ITheme[]>(`${API_URL}/themes`);
  }

  getPosts() {
    return this.http.get<IPost[]>(`${API_URL}/posts?limit=5`);
  }
}
