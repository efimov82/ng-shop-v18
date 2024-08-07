import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IOrder } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  public getOrders(): IOrder[] {
    // TODO: impliment this with REST API

    return [];
  }

  public createOrder(data: IOrder): Observable<IOrder> {
    // TODO: impliment REST API request
    // const order: IOrder = {
    //   items: data.items,
    //   personalData: data.personalData,
    // };
    // return this.http.post<IOrder>('url', order);

    // Fake request
    const res$ = of(data);

    return res$;
  }
}
