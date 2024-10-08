import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTabComponent } from './orders-tab.component';

describe('OrdersTabComponent', () => {
  let component: OrdersTabComponent;
  let fixture: ComponentFixture<OrdersTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
