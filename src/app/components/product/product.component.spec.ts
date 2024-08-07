import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IProduct } from '../../models';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent],
    }).compileComponents();

    const data: IProduct = {
      id: 1,
      name: 'Tomato',
      description: 'some text description',
      count: 1,
      price: 10,
      image: 'test.jpg',
    };

    fixture = TestBed.createComponent(ProductComponent);
    fixture.componentRef.setInput('data', data);
    fixture.componentRef.setInput('id', 1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
