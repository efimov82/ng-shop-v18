import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { IOrder } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  /*
  * Get list orders created current customer
  */
  public getOrders(): IOrder[] {
    // TODO: implement this feature with REST API

    return [];
  }

  public createOrder(data: IOrder): Observable<IOrder> {
    // TODO: impliment REST API request + loader here
    // const order: IOrder = {
    //   items: data.items,
    //   personalData: data.personalData,
    // };
    // return this.http.post<IOrder>('url', order);

    // Fake request
    const res$ = of(data).pipe(delay(3000));

    return res$;
  }
}
