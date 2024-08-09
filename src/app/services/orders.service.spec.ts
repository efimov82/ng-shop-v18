import { TestBed } from '@angular/core/testing';

import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [HttpClient, provideHttpClient(withInterceptorsFromDi())],
    });
    service = TestBed.inject(OrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
