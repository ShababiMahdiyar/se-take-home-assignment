import React, { useEffect, useState } from 'react'
import { Bot, BotStatus } from '@/models/bot';
import { OrderStatus, OrderType } from '@/models/order';
import { useSortedOrders } from '@/hooks/useSortedOrders'
import { Button } from '@nextui-org/react';
import OrderList from '@/components/orderList';
import BotList from '@/components/botList';

function Dashboard() {

  const { sortedOrders, setOrders } = useSortedOrders([]);
  const [bots, setBots] = useState<Bot[]>([]);

  const addOrder = (type: OrderType) => {
    setOrders(prevOrders => [...prevOrders, { id: sortedOrders.length + 1, type, status: OrderStatus.PENDING, botId: "None" }]);
  };

  const removeOrder = (orderId: number) => {
    const botAssignedToOrder = bots.find(bot => bot.orderId === orderId);
    if (botAssignedToOrder) {
      setBots(prevBots => prevBots.map(bot => {
        if (bot.id === botAssignedToOrder.id) {
          return { ...bot, status: BotStatus.IDLE, currentOrderId: undefined };
        }
        return bot;
      }));
    }
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  const clearOrders = () => {
    setOrders([])
  }


  const addBot = () => {
    const newBot: Bot = {
      id: `bot${bots.length + 1}`,
      status: BotStatus.IDLE,
    };
    setBots([...bots, newBot]);
  };

  const removeMostRecentBot = () => {
    const mostRecentBot = bots[bots.length - 1];
    if (mostRecentBot?.timeoutRef) {
      clearTimeout(mostRecentBot.timeoutRef);
      if (mostRecentBot.orderId) {
        setOrders(currentOrders => currentOrders.map(order =>
          order.id === mostRecentBot.orderId ? { ...order, status: OrderStatus.PENDING, botId: "None" } : order
        ));
      }
    }
    setBots(currentBots => currentBots.filter(bot => bot.id !== mostRecentBot.id));
  };



  const pendingOrdersCount = sortedOrders.filter(order => order.status === OrderStatus.PENDING).length;

  useEffect(() => {
    const assignOrdersToBots = () => {
      const availableBot = bots.find(bot => bot.status === BotStatus.IDLE);
      const pendingOrder = sortedOrders.find(order => order.status === OrderStatus.PENDING);
      if (availableBot && pendingOrder) {
        setOrders(currentOrders => currentOrders.map(order =>
          order.id === pendingOrder.id ? { ...order, status: OrderStatus.INPROGRESS, botId: availableBot.id } : order
        ));
        const timeoutRef = setTimeout(() => {
          setOrders(currentOrders => currentOrders.map(order =>
            order.id === pendingOrder.id ? { ...order, status: OrderStatus.COMPLETE } : order
          ));
          setBots(currentBots => currentBots.map(bot =>
            bot.id === availableBot.id ? { ...bot, status: BotStatus.IDLE, orderId: undefined, timeoutRef: undefined } : bot
          ));
        }, 3000);
        setBots(currentBots => currentBots.map(bot =>
          bot.id === availableBot.id ? { ...bot, status: BotStatus.PROCESSING, orderId: pendingOrder.id, timeoutRef: timeoutRef } : bot
        ));
      }
    };

    assignOrdersToBots();
  }, [pendingOrdersCount, bots, sortedOrders]);


  return (
    <div className='flex flex-col gap-y-3 w-full'>
      <div className='grid grid-cols-2 bg-gray-900 w-full rounded-lg shadow-xl justify-between p-5 gap-x-6'>
        <div className={`grid grid-cols-${sortedOrders.length && sortedOrders.every((order) => order.status === OrderStatus.COMPLETE) ? "3" : "2"} col-span-1 gap-x-4`}>
          <Button onClick={() => {
            addOrder(OrderType.NORMAL)
          }}>
            New Normal Order
          </Button>
          <Button onClick={() => {
            addOrder(OrderType.VIP)
          }}>
            New VIP Order
          </Button>
          {sortedOrders.length && sortedOrders.every((order) => order.status === OrderStatus.COMPLETE) ? (<Button onClick={() => {
            clearOrders()
          }}>
            Clear Orders
          </Button>) : (<></>)}

        </div>
        <div className='grid grid-cols-2 col-span-1 gap-x-4'>
          <Button onClick={() => {
            addBot()
          }}>
            Add Bot
          </Button>
          <Button onClick={() => {
            removeMostRecentBot()
          }}>
            Remove Bot
          </Button>
        </div>

      </div>
      <div className='grid grid-cols-2 w-full justify-center gap-x-5 rounded-lg shadow-xl'>
        <OrderList sortedOrders={sortedOrders} removeOrder={removeOrder} />
        <BotList bots={bots} />

      </div>
    </div>

  )
}

export default Dashboard