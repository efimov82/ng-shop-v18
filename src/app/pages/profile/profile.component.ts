import { Component } from '@angular/core';
import {
  AddressesTabComponent,
  OrdersTabComponent,
  ProfileTabComponent,
} from './tabs/';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [OrdersTabComponent, ProfileTabComponent, AddressesTabComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
