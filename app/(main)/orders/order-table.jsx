import currency from '@lib/currency'
import { useRouter } from 'next/navigation'
import moment from 'moment/moment'
import { getAbbreviationName } from '@lib/utils'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Skeleton } from '@components/ui/skeleton'

import OrderStatusBadge from './order-status-badge'

const OrderTable = ({ orders, searchParams }) => {
  const router = useRouter()
  const { pageIndex, pageSize, searchName } = searchParams

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>#</TableHead>
          <TableHead>Mã đơn hàng</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead className='text-center'>Ngày tạo đơn</TableHead>
          <TableHead className='text-right'>Thành tiền</TableHead>
          <TableHead className='text-right'>Phí vận chuyển</TableHead>
          <TableHead className='text-center'>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, index) => (
          <TableRow
            key={order.id}
            className='cursor-pointer'
            onClick={() => {
              router.push(`/orders/${order.id}`)
            }}
          >
            <TableCell className='text-center'>{(pageIndex - 1) * pageSize + index + 1}</TableCell>
            <TableCell className='font-medium'>{order.id.split('-').pop().toUpperCase()}</TableCell>
            <TableCell className=''>
              <div className='flex flex-row items-center gap-2'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={order.user.avatar}
                    alt={order.user.displayName}
                    className='object-cover'
                  />
                  <AvatarFallback className='rounded-lg'>
                    {getAbbreviationName(order.user.displayName || 'User')}
                  </AvatarFallback>
                </Avatar>
                {order.user.displayName}
              </div>
            </TableCell>
            <TableCell className='text-center'>{moment(order.createdAt).format('HH:mm DD/MM/YYYY')}</TableCell>
            <TableCell className='text-right'>{currency.format(order.totalAmount)}</TableCell>
            <TableCell className='text-right'>{currency.format(order.shippingFee)}</TableCell>
            <TableCell className='text-center'>
              <OrderStatusBadge status={order.orderStatus} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default OrderTable

export const OrderTableSkeleton = ({ pageSize }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>#</TableHead>
          <TableHead>Mã đơn hàng</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead className='text-center'>Ngày tạo đơn</TableHead>
          <TableHead className='text-right'>Thành tiền</TableHead>
          <TableHead className='text-right'>Phí vận chuyển</TableHead>
          <TableHead className='text-center'>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: pageSize || 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-4 w-4' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-24' />
            </TableCell>
            <TableCell>
              <div className='flex flex-row items-center gap-2'>
                <Skeleton className='h-8 w-8 rounded-lg' />
                <Skeleton className='h-4 w-32' />
              </div>
            </TableCell>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-4 w-32' />
            </TableCell>
            <TableCell className='text-right'>
              <Skeleton className='ml-auto h-4 w-24' />
            </TableCell>
            <TableCell className='text-right'>
              <Skeleton className='ml-auto h-4 w-24' />
            </TableCell>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-6 w-20' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
