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
    // this.add({ message: 'test message' });
    // this.add({ message: 'test message2' });
    // this.add({ message: 'test message3' });

    // this.timerId = setInterval(() => {
    //   this.removeFirstAlert();
    // }, 3000);
  }
  public add(alert: IAlert): void {
    alert.id = this.currentId;
    this.alerts().set(this.currentId++, alert);
  }

  public getAlerts(): Signal<Map<number, IAlert>> {
    return this.alerts.asReadonly();
  }

  protected removeFirstAlert(): void {
    const allerts = this.alerts();
    const firstAlert = allerts.keys().next();
    allerts.delete(firstAlert.value);

    console.log(firstAlert.value);
    console.log(allerts.size);
    // console.log(allerts.current);

    // this.alerts.update((value) => value.);   //set(allerts);;

    //console.log(firstAlert.value);
    // this.alerts.set({ value});

    // .delete(this.currentId);
    console.log("removed alert");
  }
}
