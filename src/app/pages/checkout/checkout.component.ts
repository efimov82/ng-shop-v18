import { CurrencyPipe, KeyValuePipe } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import {
  CartComponent,
  CartItemComponent,
  FieldErrorComponent,
  ProductComponent,
} from '../../components';
import { DeliveryType, ICartItem, IOrder, IPersonalData } from '../../models';
import { CartService, OrdersService } from '../../services';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CartComponent,
    CartItemComponent,
    FieldErrorComponent,
    ProductComponent,
    KeyValuePipe,
    CurrencyPipe,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  public cartItems!: Signal<Map<number, ICartItem>>;

  form = new FormRecord({
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl<string>(''),
    phone: new FormControl<number | null>(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[0-9]*$'),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    deliveryType: new FormControl<number>(0, [Validators.required]),
    deliveryDate: new FormControl<string>('', [Validators.required]),
    address: new FormGroup({
      city: new FormControl<string>('', [Validators.required]),
      street: new FormControl<string>('', [Validators.required]),
      house: new FormControl<string>('', [Validators.required]),
      room: new FormControl<string>(''),
    }),
  });

  constructor(
    public cartService: CartService,
    public ordersService: OrdersService,
    public router: Router
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  public deliveryTypeValue(): number {
    const val = this.form.get('deliveryType')?.value?.toString() ?? '';
    return Number(val);
  }
  public getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  public handleIncreaseQuantity(productId: number): void {
    this.cartService.increaseItemQuantity(productId);
  }

  public handleDecreaseQuantity(productId: number): void {
    this.cartService.decreaseItemQuantity(productId);
  }

  public onChangeDeliveryType(value: number): void {
    if (value === DeliveryType['PickupMyself']) {
      this.form.removeControl('address');
    } else {
      const address = new FormGroup({
        city: new FormControl<string>('', [Validators.required]),
        street: new FormControl<string>('', [Validators.required]),
        house: new FormControl<string>('', [Validators.required]),
        room: new FormControl<string>(''),
      });

      this.form.addControl('address', address);
    }
  }

  onChangeDeliveryDate(value: string): void {
    const date = new Date(value);
    const today = new Date();
    const tommorow = new Date();
    tommorow.setDate(today.getDate() + 1);

    const orderDate = new Date(
      `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    );
    const todayDate = new Date(
      `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`
    );

    if (orderDate.getTime() <= todayDate.getTime()) {
      const val = `${tommorow.getFullYear()}-0${
        tommorow.getMonth() + 1
      }-0${tommorow.getDate()}`;

      this.form.patchValue({ deliveryDate: val });
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const formData = this.form.value;

    const personalData: IPersonalData = {
      firstName: formData['firstName']?.toString() ?? '',
      lastName: formData['lastName']?.toString() ?? '',
      phone: formData['phone']?.toString() ?? '',
      email: formData['email']?.toString() ?? '',
    };

    const itemsArr: ICartItem[] = [];
    this.cartItems().forEach((item) => {
      itemsArr.push(item);
    });

    const data: IOrder = {
      personalData,
      items: itemsArr,
      deliveryDate: formData['deliveryDate']?.toString() ?? '',
      deliveryType: Number(formData['deliveryType']) ?? 1,
    };

    this.ordersService.createOrder(data).subscribe(() => {
      this.cartService.clearCart();
      this.router.navigate(['/thanks']);
    });
  }
}
