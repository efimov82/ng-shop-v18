import { Component, Signal } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ICartItem } from './models';
import { CartService } from './services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public cartItems!: Signal<Map<number, ICartItem>>;
  public countItemsInCart: number = 0;

  constructor(public cartService: CartService) {}
}
