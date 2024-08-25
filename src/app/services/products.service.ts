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

    // this.http
    //   .get('http://localhost:3000/api/products/221', {
    //     observe: 'response',
    //     headers: {
    //       'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjM5MDExNTAsImV4cCI6MTcyMzkwNDc1MCwicm9sZXMiOlsiUk9MRV9BRE1JTjEyMyIsIlJPTEVfTUFOQUdFUiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InVzZXJAZXhhbXBsZS5jb20ifQ.WcqGGdqxgfY7UZVbtHzTGKA0fYWupseXA5JizG-A5XNgS4fzxtP3fshkhQdEKgdZjS7UkB6cdGdofJrh2dJLOIgQgI89Ebs2X2B3c6_z5fBYgrzna9me-rBFXf4tK42XJ4QHViZDrZd2yAUAcPBplO1oonRV6VMkh1MZ1MpiyEy6zhDRWkkB84ZEkjxOrGdxFCI0KbWSVW_ezunHIoNWdcb6MiKpNxjqn6T_UogAcUmwPnsApX2pM0jt0PlHSB0sTyfuzUg1S33fHLGPItQYPuc1oIQkMOxgyjImXesOLUut_Us7NgcsehTuZ4X3mdQUVF_V3kU8gfEhTVCB69Th7w'
    //     }
    //   })
    //   .subscribe((response) => {
    //     console.log('resp:' + JSON.stringify(response));
    //   });

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
