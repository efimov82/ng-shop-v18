import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IProduct } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products = signal<Map<number, IProduct>>(new Map());
  counter = signal<number>(0);

  constructor(private http: HttpClient) {
    this.http.get('assets/data.json').subscribe((data) => {
      const productsRaw = data as IProduct[];
      const productsArr: Map<number, IProduct> = new Map([]);

      productsRaw.forEach((data) => {
        productsArr.set(data.id, data);
      });

      this.products.set(productsArr);
    });
  }

  public getProducts(): WritableSignal<Map<number, IProduct>> {
    return this.products;
  }
}
