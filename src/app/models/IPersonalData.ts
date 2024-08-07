import { IAddress } from './IAddress';

export interface IPersonalData {
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
  address?: IAddress;
}
