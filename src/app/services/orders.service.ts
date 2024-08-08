import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  /*
   * Get list orders created current customer
   */
  public getOrders(): IOrder[] {
    // TODO: implement this feature with REST API

    return [];
  }

  public createOrder(data: IOrder): Observable<IOrder> {
    // TODO: impliment REST API request + loader here
    const order: IOrder = {
      items: data.items,
      personalData: data.personalData,
      deliveryDate: data.deliveryDate,
      deliveryType: data.deliveryType,
    };

    return this.http.post<IOrder>(`${this.baseUrl}/orders`, order);
  }
}
