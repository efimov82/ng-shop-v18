export interface IAlert {
  id?: number;
  message: string;
  type?: 'success' | 'warning' | 'danger' | 'error';
}