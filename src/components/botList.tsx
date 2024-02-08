import { Bot } from '@/models/bot'
import { Card, CardHeader, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import React from 'react'

function BotList(props: { bots: Bot[] }) {
  const { bots } = props
  return (
    <Card className='bg-gray-900'>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col text-center mx-auto">
          <p className="text-2xl font-semibold text-gray-50">Available Bots</p>
        </div>
      </CardHeader>
      <CardBody>
        <Table>
          <TableHeader>
            <TableColumn>BOT ID</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          {bots.length ? (<TableBody>
            {bots.map((bot) => (
              <TableRow key={bot.id}>
                <TableCell>{bot.id}</TableCell>
                <TableCell>{bot.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>) : (<TableBody emptyContent={"No bot is available."}>{[]}</TableBody>)}

        </Table>
      </CardBody>
    </Card>
  )
}

export default BotList