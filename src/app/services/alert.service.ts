import { Injectable, Signal, signal } from '@angular/core';
import { IAlert } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alerts = signal<Map<number, IAlert>>(new Map());
  private currentId = 1;
  private timerId: any;

  constructor() {
    this.add({ message: 'test message' });
    this.add({ message: 'test message2' });
    this.add({ message: 'test message3' });
  }
  public add(alert: IAlert): void {
    alert.id = this.currentId;

    // set interval for remove alerts
    if (this.currentId === 1) {
      this.timerId = setInterval(() => {
        this.removeFirstAlert();
      }, 5000);
    }

    this.alerts().set(this.currentId++, alert);
  }

  public getAlerts(): Signal<Map<number, IAlert>> {
    return this.alerts.asReadonly();
  }

  protected removeFirstAlert(): void {
    const allerts = this.alerts();
    const firstAlert = allerts.keys().next();
    allerts.delete(firstAlert.value);

    const newAllerts = new Map<number, IAlert>();
    allerts.forEach((element, key) => {
      newAllerts.set(key, element);
    });

    this.alerts.set(newAllerts);

    if (newAllerts.size === 0) {
      clearInterval(this.timerId);
      this.currentId = 1;
    }
  }
}
