import { CurrencyPipe, KeyValuePipe } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { OrderItemDto } from '../../models';
import { CartService } from '../../services';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [KeyValuePipe, CartItemComponent, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  public cartItems!: Signal<Map<number, OrderItemDto>>;

  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  public getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  public handleIncreaseQuantity(productId: number): void {
    this.cartService.increaseItemQuantity(productId);
  }

  public handleDecreaseQuantity(productId: number): void {
    this.cartService.decreaseItemQuantity(productId);
  }
}
