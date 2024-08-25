import { ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components';
import { ICartItem } from './models';
import { CartService, LoaderService } from './services';
import { UserStore } from './store/userStore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, LoaderComponent],
  providers: [UserStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public cartItems!: Signal<Map<number, ICartItem>>;
  public countItemsInCart: number = 0;
  public isLoading: Signal<boolean> = signal(false);

  readonly store = inject(UserStore);

  constructor(
    public cartService: CartService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    // TODO check it is realy need?
    //this.isLoading = this.loaderService.isLoading();

    this.store.loadUser();
  }
}
