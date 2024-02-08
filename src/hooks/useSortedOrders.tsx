import { Order, OrderStatus, OrderType } from '@/models/order';
import { useState, useCallback } from 'react';

export function useSortedOrders(initialOrders: Order[]) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const sortOrders = useCallback(() => {
    return orders.slice().sort((a, b) => {
      const statusPriorityMap = {
        [OrderStatus.INPROGRESS]: 3,
        [OrderStatus.PENDING]: 2,
        [OrderStatus.COMPLETE]: 1,
      };
      const statusPriorityA = statusPriorityMap[a.status];
      const statusPriorityB = statusPriorityMap[b.status];
      if (statusPriorityA !== statusPriorityB) {
        return statusPriorityB - statusPriorityA;
      }
      const typePriorityA = a.type === OrderType.VIP ? 1 : 0;
      const typePriorityB = b.type === OrderType.VIP ? 1 : 0;
      if (typePriorityA !== typePriorityB) {
        return typePriorityB - typePriorityA;
      }
      return a.id - b.id;
    });
  }, [orders]);

  return { sortedOrders: sortOrders(), setOrders };
}
