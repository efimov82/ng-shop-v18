import { Component, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components';
import { ICartItem } from './models';
import { CartService, LoaderService } from './services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public cartItems!: Signal<Map<number, ICartItem>>;
  public countItemsInCart: number = 0;
  public isLoading: Signal<boolean> = signal(false);

  constructor(
    public cartService: CartService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.loaderService.isLoading();
  }
}
