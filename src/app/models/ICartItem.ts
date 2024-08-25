import { Product } from './';

export interface ICartItem {
  id: number;
  product: Product;
  count: number;
}
