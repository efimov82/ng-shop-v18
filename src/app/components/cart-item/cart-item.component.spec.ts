import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ICartItem } from '../../models';
import { CartItemComponent } from './cart-item.component';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemComponent],
    }).compileComponents();

    const data: ICartItem = {
      id: 1,
      product: {
        id: 2,
        name: 'Test Product',
        description: 'Description',
        count: 1,
        price: 14,
        image: 'text.jpg',
      },
      count: 2,
    };
    fixture = TestBed.createComponent(CartItemComponent);
    fixture.componentRef.setInput('data', data);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
