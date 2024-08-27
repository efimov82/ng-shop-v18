import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const userService = inject(UserService);
  const authToken = userService.getAuthToken();

  if (authToken) {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });

    return next(modifiedReq);
  } else {
    return next(req);
  }
};
