import { Routes } from '@angular/router';
import { CheckoutComponent, HomeComponent, ThanksComponent } from './pages';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':page', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'thanks', component: ThanksComponent },
];
