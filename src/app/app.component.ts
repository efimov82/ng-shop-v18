import { Component, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ICartItem } from './models';
import { CartService } from './services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'shop-signals';
  public cartItems!: Signal<Map<number, ICartItem>>;
  public countItemsInCart: number = 0;

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }
}
