import { inject, Injectable } from '@angular/core';
import { exhaustMap, pipe, tap } from 'rxjs';
import { signalState, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

import { User } from '../models';
import { UserService } from '../services';

type UserState = { user: User | null; isLoading: boolean };

const initialState: UserState = {
  user: null,
  isLoading: false,
};

@Injectable()
export class UserStore {
  readonly #userService = inject(UserService);
  readonly #state = signalState(initialState);

  readonly user = this.#state.user;
  readonly isLoading = this.#state.isLoading;

  readonly loadUser = rxMethod<void>(
    pipe(
      tap(() => patchState(this.#state, { isLoading: true })),
      exhaustMap(() => {
        return this.#userService.getCurrentUser().pipe(
          tapResponse({
            next: (user: User) => patchState(this.#state, { user }),
            error: console.error,
            finalize: () => patchState(this.#state, { isLoading: false }),
          })
        );
      })
    )
  );
}
