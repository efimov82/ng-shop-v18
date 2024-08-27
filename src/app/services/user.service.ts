import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { LoaderService } from './loader.service';
import { User } from '../models';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private _authTokenStorageKey = 'auth_token';
  private _authToken = '';

  constructor(private http: HttpClient, private loaderService: LoaderService) {
    super();
  }

  public getUserPrtofile(): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/user/profile');
  }

  public getAuthToken(): string | null {
    if (this._authToken) {
      return this._authToken;
    }

    const sessionToken = window.sessionStorage.getItem(
      this._authTokenStorageKey
    );
    if (sessionToken) {
      this._authToken = sessionToken;
      return sessionToken;
    }

    const localStorageToken = window.localStorage.getItem(
      this._authTokenStorageKey
    );
    if (localStorageToken) {
      this._authToken = localStorageToken;
      return localStorageToken;
    }

    return null;
  }

  public setAuthToken(token: string, saveToLocalStorage = false): void {
    this._authToken = token;
    window.sessionStorage.setItem(this._authTokenStorageKey, token);

    if (saveToLocalStorage) {
      window.localStorage.setItem(this._authTokenStorageKey, token);
    }
  }

  public login(login: string, password: string) {
    //: Observable<HttpResponse<User>> {
    const payload = { username: login, password };

    return this.http
      .post(`${this.baseUrl}/auth/login`, payload, {
        observe: 'response',
      })
      // .pipe(catchError<any, any>(this.handleError));
  }

  public logout(): void {
    this._authToken = '';
    window.sessionStorage.removeItem(this._authTokenStorageKey);
    window.localStorage.removeItem(this._authTokenStorageKey);
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
