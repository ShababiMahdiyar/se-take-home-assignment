export interface Order {
  id: number;
  type: OrderType;
  status: OrderStatus;
  botId: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  INPROGRESS = 'INPROGRESS',
  COMPLETE = 'COMPLETE',
}
export enum OrderType {
  NORMAL = 'NORMAL',
  VIP = 'VIP',
}
