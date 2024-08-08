import { KeyValuePipe } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CartComponent,
  CartItemComponent,
  ProductComponent,
} from '../../components';
import { IProduct } from '../../models';
import { CartService, ProductsService } from '../../services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CartComponent,
    CartItemComponent,
    ProductComponent,
    KeyValuePipe,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public products!: WritableSignal<Map<number, IProduct>>;

  constructor(
    public cartService: CartService,
    public productsServide: ProductsService
  ) {}

  ngOnInit() {
    this.products = this.productsServide.getProducts();
  }

  public addValue() {
    this.productsServide.counter.set(this.productsServide.counter() + 1);
  }

  public handleAddProductToCart($event: number) {
    const product = this.products().get($event);

    if (product) {
      this.cartService.addItemToCart(product);
    }
  }
}
