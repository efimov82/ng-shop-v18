import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ICartItem } from '../../models';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  data = input.required<ICartItem>();
  onIncreaseQuantity = output<number>();
  onDecreaseQuantity = output<number>();

  public increaseItemQuantity(): void {
    this.onIncreaseQuantity.emit(this.data().product.id);
  }

  public decreaseItemQuantity(): void {
    this.onDecreaseQuantity.emit(this.data().product.id);
  }
}
