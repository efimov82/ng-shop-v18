import { Component, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from './services';
import { ICartItem } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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

    console.log('countItemsInCart=', this.cartItems);
  }
}
