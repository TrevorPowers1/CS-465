import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripData } from './trip-data';

@Injectable({
  providedIn: 'root'
})
export class Authentication {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripData
  ) {}

  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  public getCurrentUser(): User {
    const token = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));

    return { email, name } as User;
  }

  public login(
    user: User,
    passwd: string
  ): Observable<AuthResponse> {
    return this.tripDataService.login(user, passwd).pipe(
      tap((response: AuthResponse) => {
        this.saveToken(response.token);
      })
    );
  }

  public register(
    user: User,
    passwd: string
  ): Observable<AuthResponse> {
    return this.tripDataService.register(user, passwd).pipe(
      tap((response: AuthResponse) => {
        this.saveToken(response.token);
      })
    );
  }
}