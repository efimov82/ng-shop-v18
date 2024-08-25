import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrderRequest, Order } from '../models';
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
  public getOrders(): Order[] {
    // TODO: implement this feature with REST API

    return [];
  }

  public createOrder(data: CreateOrderRequest): Observable<Order> {
    // TODO: impliment REST API request + loader here
    // const order = { // Order
    //   orderItems: data.orderItems,
      // personalData: data.personalData,
      // deliveryDate: data.deliveryDate,
      // deliveryType: data.deliveryType,
    // };

    return this.http.post<Order>(`${this.baseUrl}/user/orders`, data);
  }
}
