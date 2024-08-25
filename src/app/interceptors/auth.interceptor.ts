import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  // const userToken = sessionStorage.getItem('authToken');
  const userToken = 'token12312123123';

  if (userToken) {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    });

    return next(modifiedReq);
  } else {
    return next(req);
  }
};
