import { Component, OnInit, Signal } from '@angular/core';
import { CurrencyPipe, KeyValuePipe } from '@angular/common';

import { CartService } from '../../services';
import { ICartItem } from '../../models';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [KeyValuePipe, CartItemComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  public cartItems!: Signal<Map<number, ICartItem>>;

  constructor( public cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();

    console.log(this.cartItems);
  }

  public getTotalPrice() {
    let totalPrice = 0;

    this.cartItems().forEach((item, id) => {
      totalPrice += item.product.price * item.count;
    });

    return totalPrice;
  }

  public handleIncreaseQuantity(productId: number): void {
    this.cartService.increaseItemQuantity(productId);
  }

  public handleDecreaseQuantity(productId: number): void {
    this.cartService.decreaseItemQuantity(productId);
  }
}
