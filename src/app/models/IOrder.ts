import { ICartItem } from './ICartItem';
import { IOrderState } from './IOrderState';
import { IPersonalData } from './IPersonalData';

export interface IOrder {
  id?: number;
  date?: number; // timestamp of the order
  personalData: IPersonalData;
  items: ICartItem[];
  deliveryDate: string;
  deliveryType: number;
  state?: IOrderState;
}
