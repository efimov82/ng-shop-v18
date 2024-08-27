import { inject, Injectable, signal, Signal } from '@angular/core';
import { exhaustMap, pipe, tap } from 'rxjs';
import { signalState, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

import { IAlert, User } from '../models';
import { AlertService, UserService } from '../services';

type UserState = {
  user: User | null;
  alerts: Map<number, IAlert>;
  isLoading: boolean;
};

const initialState: UserState = {
  user: null,
  alerts: new Map(),
  isLoading: false,
};

@Injectable({ providedIn: 'root' })
export class UserStore {
  readonly #userService = inject(UserService);
  readonly #alerService = inject(AlertService);
  readonly #state = signalState(initialState);

  readonly user = this.#state.user;
  readonly isLoading = this.#state.isLoading;
  readonly alerts = this.#state.alerts;

  readonly loadUserData = rxMethod<void>(
    pipe(
      tap(() => patchState(this.#state, { isLoading: true })),
      exhaustMap(() => {
        return this.#userService.getUserPrtofile().pipe(
          tapResponse({
            next: (user: User) => {
              patchState(this.#state, { user });
            },
            error: (error) => {
              this.#userService.logout();
              console.error(error);
            },
            finalize: () => patchState(this.#state, { isLoading: false }),
          })
        );
      })
    )
  );

  readonly logoutUser = () => {
    patchState(this.#state, { user: null });
    this.#userService.logout();
  };

  readonly getAlerts = () => {
    return this.alerts;
  };
}
