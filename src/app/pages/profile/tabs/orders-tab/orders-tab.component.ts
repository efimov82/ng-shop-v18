import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../../services';
import { CustomerOrder } from '../../../../models';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders-tab',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './orders-tab.component.html',
  styleUrl: './orders-tab.component.scss',
})
export class OrdersTabComponent implements OnInit {
  public orders$?: Observable<CustomerOrder[]>;

  constructor(private orderService: OrdersService) {}

  ngOnInit() {
    this.orders$ = this.orderService.getOrders();
  }

  public getOrderStatusName(statusId: number): string {
    switch (statusId) {
      case 0:
        return 'NEW';
      case 1:
        return 'WAITING';
      default:
        return 'UNKNOWN';
    }
  }
}
