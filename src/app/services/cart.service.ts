import { Injectable, Signal, signal } from '@angular/core';
import { ICartItem, IProduct } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  protected cartItems = signal<Map<number, ICartItem>>(new Map());

  public getCartItems(): Signal<Map<number, ICartItem>> {
    return this.cartItems.asReadonly();
  }

  public getCartItemsCount(): number {
    const items = this.getCartItems();
    let count = 0;
    items().forEach((item) => (count += item.count));

    return count;
  }

  public addItemToCart(item: IProduct): void {
    const cartItems = this.cartItems();
    const productId = item['id'];
    let cartItem: ICartItem;
    const existItem = cartItems.get(productId);

    if (existItem) {
      cartItem = existItem;
    } else {
      cartItem = { id: item.id, product: item, count: 0 };
    }

    cartItem['count']++;
    cartItems.set(productId, cartItem);
  }
}
