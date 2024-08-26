import { KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent, LoaderComponent } from './components';
import { ICartItem } from './models';
import { AlertService, LoaderService } from './services';
import { UserStore } from './store/userStore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterModule,
    LoaderComponent,
    HeaderComponent,
    KeyValuePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public cartItems!: Signal<Map<number, ICartItem>>;
  public countItemsInCart: number = 0;
  public isLoading: Signal<boolean> = signal(false);

  constructor(
    public alertService: AlertService,
    public loaderService: LoaderService,
    public store: UserStore
  ) {}

  ngOnInit(): void {
    // TODO check it is realy need?
    this.isLoading = this.loaderService.isLoading();

    this.store.loadUser();
  }
}
