import { Inject, Injectable } from '@angular/core';
import { LocalStorage } from '../core/injection-tokens';
import { ICommonUserData } from '../interfaces/commonUserData';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: ICommonUserData | undefined;
  constructor(@Inject(LocalStorage) private localStorage: Window['localStorage']) {
    const userData = this.localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : undefined;
  }

  get isAuth(): boolean {
    return !!this.user;
  }

  login(email: string, password: string): void {
    this.user = {
      email,
      username: 'John Doe'
    }

    this.localStorage.setItem('user', JSON.stringify(this.user));
  }

  register(email: string, password: string) {
    this.login(email, password);
  }

  logout(): void {
    this.user = undefined;
    this.localStorage.removeItem('user');
  }
}