import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorage } from '../core/injection-tokens';
import { IUser } from '../interfaces/user';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: IUser | undefined;
  constructor(
    @Inject(LocalStorage) private localStorage: Window['localStorage'],
    private http: HttpClient
  ) {
    const userData = this.localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : undefined;
  }

  get isAuth(): boolean {
    return !!this.user;
  }

  private setUser(user: IUser): void {
    this.user = user
    console.log('Logged in as', user.username);
    this.localStorage.setItem('user', JSON.stringify(user));
  }

  login(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(`${API_URL}/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap(user => this.setUser(user))
      )
  }

  register(data: { username: string, email: string; password: string; rePassword: string, tel: string }): Observable<IUser> {
    return this.http.post<IUser>(`${API_URL}/register`, data, { withCredentials: true })
      .pipe(
        tap(user => this.setUser(user))
      );
  }

  logout(): Observable<IUser> {
    return this.http.post<IUser>(`${API_URL}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.user = undefined;
          this.localStorage.removeItem('user');
        })
      )
  }

  getUserData(): Observable<IUser> {
    return this.http.get<IUser>(`${API_URL}/users/profile`, { withCredentials: true })
      .pipe(
        tap(user => this.setUser(user))
      )
  }

  updateProfile(data: { username: string, email: string; tel: string }): Observable<IUser> {
    return this.http.put<IUser>(`${API_URL}/users/profile`, data, { withCredentials: true })
      .pipe(
        tap(user => this.setUser(user))
      );
  }
}