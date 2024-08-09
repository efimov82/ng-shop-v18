import { KeyValuePipe } from '@angular/common';
import { Component, computed, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  CartComponent,
  CartItemComponent,
  PaginationComponent,
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
    PaginationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public products!: Signal<Map<number, IProduct>>;
  public page: number = 1;
  public itemOnPage: number = 6;
  public totalItems!: Signal<number>;
  public countPages: Signal<number> = computed(() =>
    Math.round(this.totalItems() / this.itemOnPage)
  );

  constructor(
    public cartService: CartService,
    public productsServide: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.page =
        Number(params.get('page')) > 0 ? Number(params.get('page')) : 1;
      this.productsServide.loadData(this.page, this.itemOnPage);
    });

    this.products = this.productsServide.getProducts();
    this.totalItems = this.productsServide.getTotalCount();
  }

  public handleAddProductToCart($event: number) {
    const product = this.products().get($event);

    if (product) {
      this.cartService.addItemToCart(product);
    }
  }
}
