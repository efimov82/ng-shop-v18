import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { ICartItem, IProduct } from '../models';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new item to empty cart', () => {
    const productId = 132;
    const product: IProduct = {
      id: productId,
      name: 'Potato',
      description: 'Product description',
      count: 1,
      price: 1.5,
      image: 'test.jpg',
    };

    service.addItemToCart(product);

    const items = service.getCartItems();
    const expected: ICartItem = {
      id: productId,
      product,
      count: 1,
    };

    expect(items().size).toEqual(1);
    expect(items().get(productId)).toEqual(expected);
  });

  it('should add new other item to cart with items', () => {
    const productId1 = 132;
    const product1: IProduct = {
      id: productId1,
      name: 'Potato',
      description: 'Product description',
      count: 1,
      price: 1.5,
      image: 'test.jpg',
    };

    service.addItemToCart(product1);

    const productId2 = 133;
    const product2: IProduct = {
      id: productId2,
      name: 'Tomato',
      description: 'Product description 2',
      count: 1,
      price: 2.5,
      image: 'tomato.jpg',
    };

    service.addItemToCart(product2);

    const items = service.getCartItems();
    expect(items().size).toEqual(2);
  });

  it('should increase item quantity', () => {
    const productId = 132;
    const product: IProduct = {
      id: productId,
      name: 'Potato',
      description: 'Product description',
      count: 1,
      price: 1.5,
      image: 'test.jpg',
    };

    service.addItemToCart(product);
    service.addItemToCart(product);
    service.addItemToCart(product);

    const items = service.getCartItems();
    const expected: ICartItem = {
      id: productId,
      product,
      count: 3,
    };

    expect(items().size).toEqual(1);
    expect(items().get(productId)).toEqual(expected);
  });

  it('should decrease item quantity', () => {
    const productId = 12;
    const product: IProduct = {
      id: productId,
      name: 'Potato',
      description: 'Product description',
      count: 1,
      price: 1.5,
      image: 'test.jpg',
    };

    service.addItemToCart(product);
    service.addItemToCart(product);
    service.addItemToCart(product);

    service.decreaseItemQuantity(productId);

    const items = service.getCartItems();
    const expected: ICartItem = {
      id: productId,
      product,
      count: 2,
    };

    expect(items().size).toEqual(1);
    expect(items().get(productId)).toEqual(expected);
  });

  it('should remove item with zero count on decrease item quantity', () => {
    const productId = 13;
    const product: IProduct = {
      id: productId,
      name: 'Potato',
      description: 'Product description',
      count: 1,
      price: 1.5,
      image: 'test.jpg',
    };

    service.addItemToCart(product);

    service.decreaseItemQuantity(productId);

    const items = service.getCartItems();
    const expected: Map<number, ICartItem> = new Map();

    expect(items().size).toEqual(0);
    expect(items()).toEqual(expected);
  });

  it('should get cart items count', () => {
    const productId1 = 14;
    const product1: IProduct = {
      id: productId1,
      name: 'Potato',
      description: 'Product description',
      count: 1,
      price: 1.5,
      image: 'test.jpg',
    };

    service.addItemToCart(product1);
    service.addItemToCart(product1);

    const productId2 = 15;
    const product2: IProduct = {
      id: productId2,
      name: 'Potato 2',
      description: 'Product description 2',
      count: 1,
      price: 1.7,
      image: 'test2.jpg',
    };

    service.addItemToCart(product2);

    const itemsCount = service.getCartItemsCount();
    expect(itemsCount).toEqual(3);
  });

  it('should get total price', () => {
    const productId1 = 132;
    const product1: IProduct = {
      id: productId1,
      name: 'Potato',
      description: 'Product description',
      count: 1,
      price: 1.5,
      image: 'test.jpg',
    };

    service.addItemToCart(product1);
    service.addItemToCart(product1);

    const productId2 = 133;
    const product2: IProduct = {
      id: productId2,
      name: 'Tomato',
      description: 'Product description 2',
      count: 1,
      price: 2.5,
      image: 'tomato.jpg',
    };

    service.addItemToCart(product2);
    service.addItemToCart(product2);

    const totalPrice = service.getTotalPrice();
    const expected = 8;

    expect(totalPrice).toEqual(expected);
  });

  it('should clear cart', () => {
    const productId1 = 132;
    const product1: IProduct = {
      id: productId1,
      name: 'Potato',
      description: 'Product description',
      count: 1,
      price: 1.5,
      image: 'test.jpg',
    };

    service.addItemToCart(product1);
    service.addItemToCart(product1);

    service.clearCart();
    const items = service.getCartItems();

    expect(items()).toEqual(new Map());
  });
});
