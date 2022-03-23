import { HttpClient } from '@angular/common/http';
import { Injectable, IterableChangeRecord } from '@angular/core';
import { IPost } from './interfaces/post';
import { ITheme } from './interfaces/theme';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IPopulatedTheme } from './interfaces/populatedTheme';
const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private http: HttpClient) { }

  getThemes(): Observable<ITheme[]> | undefined {
    return this.http.get<ITheme[]>(`${API_URL}/themes`);
  }

  getPosts(): Observable<IPost[]> | undefined {
    return this.http.get<IPost[]>(`${API_URL}/posts?limit=5`);
  }

  getComments(id: string): Observable<IPopulatedTheme> | undefined {
    return this.http.get<IPopulatedTheme>(`${API_URL}/themes/${id}`)
  }
}
