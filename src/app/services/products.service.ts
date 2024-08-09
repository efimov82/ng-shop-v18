import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';

import { IProduct } from '../models';
import { BaseService } from './base.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService {
  private products = signal<Map<number, IProduct>>(new Map());
  private totalCount = signal<number>(0);

  constructor(private http: HttpClient, private loaderService: LoaderService) {
    super();
  }

  public loadData(page: number, limit: number): void {
    this.loaderService.setIsLoading(true);

    this.http
      .get(`${this.baseUrl}/products?_page=${page}&_limit=${limit}`, {
        observe: 'response',
      })
      .subscribe({
        next: (data) => {
          const totalCount = Number(data.headers.get('x-total-count'));
          this.totalCount.set(totalCount);
          
          const productsRaw = data.body as IProduct[];
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

  public getProducts(): Signal<Map<number, IProduct>> {
    return this.products.asReadonly();
  }

  public getTotalCount(): Signal<number> {
    return this.totalCount.asReadonly();
  }
}
