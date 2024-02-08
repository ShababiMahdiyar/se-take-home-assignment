export interface Bot {
  id: string;
  status: BotStatus;
  orderId?: number;
  timeoutRef?: ReturnType<typeof setTimeout>;
}

export enum BotStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
}
