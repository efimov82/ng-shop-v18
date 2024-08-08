import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _isLoading = signal(false);

  constructor() { }

  public setIsLoading(value: boolean) {
    this._isLoading.set(value);
  }

  public isLoading(): Signal<boolean> {
    return this._isLoading.asReadonly();
  }
}
