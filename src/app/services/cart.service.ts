import { Injectable, Signal, signal } from '@angular/core';
import { Product } from '../models';
import { OrderItemDto } from '../models/generated/model/orderItemDto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  protected cartItems = signal<Map<number, OrderItemDto>>(new Map());

  public getCartItems(): Signal<Map<number, OrderItemDto>> {
    return this.cartItems.asReadonly();
  }

  public getCartItemsCount(): number {
    const items = this.getCartItems();
    let count = 0;
    items().forEach((item) => (count += item.count));

    return count;
  }

  public getTotalPrice(): number {
    let totalPrice = 0;

    this.cartItems().forEach((item) => {
      totalPrice += 0; //item.Product.price * item.count;
    });

    return totalPrice;
  }

  public addItemToCart(item: Product): void {
    const cartItems = this.cartItems();
    const productId = item['id'];
    let cartItem: OrderItemDto;
    const existItem = cartItems.get(productId);

    if (existItem) {
      cartItem = existItem;
    } else {
      cartItem = { product_id: item.id, count: 0 };
    }

    cartItem['count']++;
    cartItems.set(productId, cartItem);
  }

  public increaseItemQuantity(productId: number): void {
    const cartItems = this.cartItems();
    const item = cartItems.get(productId);

    if (item) {
      item['count']++;
      cartItems.set(productId, item);

      this.cartItems.set(cartItems);
    }
  }

  public decreaseItemQuantity(productId: number): void {
    const cartItems = this.cartItems();
    const item = cartItems.get(productId);

    if (item) {
      item['count']--;

      if (item['count'] > 0) {
        cartItems.set(productId, item);
      } else {
        cartItems.delete(productId);
      }

      this.cartItems.set(cartItems);
    }
  }

  public clearCart(): void {
    this.cartItems.set(new Map());
  }
}
