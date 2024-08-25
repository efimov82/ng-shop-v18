import { Component, input, output } from '@angular/core';
import { Product } from '../../models';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  data = input.required<Product>();
  id = input.required<number>();

  onAddToCart = output<number>();

  public addToCart(): void {
    this.onAddToCart.emit(this.id());
  }

  public getClassNameForCard(): string {
    return ''; //this.data().count === 0 ? 'product-not-available' : '';
  }
}
