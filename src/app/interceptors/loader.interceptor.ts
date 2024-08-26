import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { LoaderService } from '../services';

export const LoaderHttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const loaderService = inject(LoaderService);
  loaderService.setIsLoading(true);

  return next(req).pipe(
    finalize(() => {
      loaderService.setIsLoading(false);
    })
  );
};
