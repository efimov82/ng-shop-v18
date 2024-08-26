import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { UserStore } from '../../store/userStore';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  constructor(public store: UserStore) {}

  public logout(): void {
    this.store.logoutUser();
  }
}
