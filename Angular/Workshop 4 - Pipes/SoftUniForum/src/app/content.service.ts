import { HttpClient } from '@angular/common/http';
import { Injectable, IterableChangeRecord } from '@angular/core';
import { IPost } from './interfaces/post';
import { ITheme } from './interfaces/theme';

import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { IPopulatedTheme } from './interfaces/populatedTheme';
const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private http: HttpClient) { }

  getThemes(): Observable<ITheme[]> {
    return this.http.get<ITheme[]>(`${API_URL}/themes`);
  }

  getPosts(limit?: number): Observable<IPost[]> {
    const query = limit ? `?limit=${limit} ` : '';
    return this.http.get<IPost[]>(`${API_URL}/posts${query}`);
  }

  getComments(id: string): Observable<IPopulatedTheme> {
    return this.http.get<IPopulatedTheme>(`${API_URL}/themes/${id}`)
  }

  newTheme(data: { themeName: string, postText: string }): Observable<ITheme> {
    return this.http.post<ITheme>(`${API_URL}/themes`, data, { withCredentials: true });
  }

  subscribeToTheme(id: string): Observable<ITheme> {
    return this.http.put<ITheme>(`${API_URL}/themes/${id}`, {}, { withCredentials: true });
  }

  commentTheme(id: string, postText: string): Observable<IPopulatedTheme> {
    return this.http.post<IPopulatedTheme>(`${API_URL}/themes/${id}`, { postText }, { withCredentials: true });
  }

  likePost(id: string): Observable<IPost> {
    return this.http.put<IPost>(`${API_URL}/likes/${id}`, {}, { withCredentials: true }).pipe(tap((post) => console.log(post)));
  }
}
