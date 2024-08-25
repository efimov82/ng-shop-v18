import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const LoginInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);

  return next(req).pipe(
    // next.handle(req)
    tap({
      error: (e) => {
        if (e instanceof HttpErrorResponse && e.status === 401) {
          router.navigateByUrl('/login');
        }
      },
    })
  );
};
