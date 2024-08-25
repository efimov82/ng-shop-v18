import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { LoaderService } from './loader.service';
import { User } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private _authTokenStorageKey = 'auth_token';

  constructor(private http: HttpClient, private loaderService: LoaderService) {
    super();
  }

  public getCurrentUser(): Observable<User> {
    // const authToken = this.getAuthToken();

    return this.http.get<User>(this.baseUrl + '/user/profile');
  }

  public getAuthToken(): string | null {
    const sessionToken = window.sessionStorage.getItem(this._authTokenStorageKey);
    if (sessionToken) {
      return sessionToken;
    }

    const localStorageToken = window.localStorage.getItem(this._authTokenStorageKey);
    if (localStorageToken) {
      return localStorageToken;
    }

    return null;
  }

  public setAuthToken(value: string, saveToLocalStorage = false): void {
    window.sessionStorage.setItem(this._authTokenStorageKey, value);

    if (saveToLocalStorage) {
      window.localStorage.setItem(this._authTokenStorageKey, value);
    }
  }
}
