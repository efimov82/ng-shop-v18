import { IProduct } from './IProduct';

export interface ICartItem {
  id: number;
  product: IProduct;
  count: number;
}
