import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';

import { Product } from '../models';
import { BaseService } from './base.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService {
  private products = signal<Map<number, Product>>(new Map());
  private totalCount = signal<number>(0);

  constructor(private http: HttpClient, private loaderService: LoaderService) {
    super();
  }

  public loadData(page: number, limit: number): void {
    this.loaderService.setIsLoading(true);

    this.http
      .get(`${this.baseUrl}/products?page=${page}&limit=${limit}`, {
        observe: 'response',
      })
      .subscribe({
        next: (data) => {
          const totalCount = Number(data.headers.get('x-total-items'));
          this.totalCount.set(totalCount);

          const productsRaw = data.body as Product[];
          const productsArr: Map<number, Product> = new Map([]);

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

  public getProducts(): Signal<Map<number, Product>> {
    return this.products.asReadonly();
  }

  public getTotalCount(): Signal<number> {
    return this.totalCount.asReadonly();
  }
}
