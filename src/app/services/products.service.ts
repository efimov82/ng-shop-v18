import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';

import { IProduct } from '../models';
import { LoaderService } from './loader.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService {
  private products = signal<Map<number, IProduct>>(new Map());

  constructor(private http: HttpClient, private loaderService: LoaderService) {
    super();

    this.loaderService.setIsLoading(true);

    this.http.get(`${this.baseUrl}/products`).subscribe({
      next: (data) => {
        const productsRaw = data as IProduct[];
        const productsArr: Map<number, IProduct> = new Map([]);

        productsRaw.forEach((data) => {
          productsArr.set(data.id, data);
        });

        this.products.set(productsArr);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.loaderService.setIsLoading(false);
      },
    });
  }

  public getProducts(): WritableSignal<Map<number, IProduct>> {
    return this.products;
  }
}
