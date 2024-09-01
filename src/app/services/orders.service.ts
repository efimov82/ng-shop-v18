import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrderRequest, CustomerOrder } from '../models';
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
  public getOrders(): Observable<CustomerOrder[]> {
    // TODO add params page, litim + sort orders
    return this.http.get<CustomerOrder[]>(`${this.baseUrl}/user/orders`);
  }

  public createOrder(data: CreateOrderRequest): Observable<CustomerOrder> {
    // TODO: impliment REST API request + loader here
    // const order = { // Order
    //   orderItems: data.orderItems,
      // personalData: data.personalData,
      // deliveryDate: data.deliveryDate,
      // deliveryType: data.deliveryType,
    // };

    return this.http.post<CustomerOrder>(`${this.baseUrl}/user/orders`, data);
  }
}
