import { Order, OrderStatus, OrderType } from '@/models/order'
import { Card, CardHeader, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react'
import React from 'react'

function OrderList(props: { sortedOrders: Order[], removeOrder: (orderId: number) => void }) {
  const { sortedOrders, removeOrder } = props
  return (
    <Card className='bg-gray-900'>
      <CardHeader className="flex gap-3">

        <div className="flex flex-col mx-auto">
          <p className="text-2xl font-semibold text-gray-50">Ongoing Orders</p>
        </div>
      </CardHeader>
      <CardBody>
        <Table aria-label="Orders Table">
          <TableHeader>
            <TableColumn>ORDER ID</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>TYPE</TableColumn>
            <TableColumn>BOT ID</TableColumn>
          </TableHeader>
          {sortedOrders.length ? (<TableBody>
            {sortedOrders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <Chip color={order.status === OrderStatus.COMPLETE ? "success" : order.status === OrderStatus.INPROGRESS ? "secondary" : "warning"} variant="flat">{order.status}</Chip>
                </TableCell>
                <TableCell>
                  <Chip color={order.type === OrderType.VIP ? "secondary" : "primary"} variant="flat">{order.type}</Chip>
                </TableCell>
                <TableCell className='flex items-center gap-x-2'>
                  {order.botId}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    onClick={() => {
                      removeOrder(order.id)
                    }}
                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>) : (<TableBody emptyContent={"No orders to display."}>{[]}</TableBody>)}

        </Table>
      </CardBody>
    </Card>
  )
}

export default OrderList