import currency from '@lib/currency'
import { useRouter } from 'next/navigation'
import moment from 'moment/moment'
import { getAbbreviationName } from '@lib/utils'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Skeleton } from '@components/ui/skeleton'

import RefundRequestStatusBadge from './refund-request-status-badge'

const RefundRequestTable = ({ refundRequests, searchParams }) => {
  const router = useRouter()
  const { pageIndex, pageSize, searchName } = searchParams

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>#</TableHead>
          <TableHead>Mã đơn hàng</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead>Sản phẩm</TableHead>
          <TableHead>Lý do</TableHead>
          <TableHead className='text-center'>Ngày yêu cầu</TableHead>
          <TableHead className='text-center'>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {refundRequests.map((refundRequest, index) => (
          <TableRow
            key={refundRequest.id}
            className='cursor-pointer'
            onClick={() => {
              router.push(`/refund-requests/${refundRequest.id}`)
            }}
          >
            <TableCell className='text-center'>{(pageIndex - 1) * pageSize + index + 1}</TableCell>
            <TableCell className='font-medium'>{refundRequest.order.id.split('-').pop().toUpperCase()}</TableCell>
            <TableCell className=''>
              <div className='flex flex-row items-center gap-2'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={refundRequest.user.avatar}
                    alt={refundRequest.user.username}
                    className='object-cover'
                  />
                  <AvatarFallback className='rounded-lg'>
                    {getAbbreviationName(refundRequest.user.displayName || 'User')}
                  </AvatarFallback>
                </Avatar>
                {refundRequest.user.username}
              </div>
            </TableCell>
            <TableCell>{refundRequest.product?.name || 'Không tồn tại'}</TableCell>
            <TableCell>{refundRequest.refundReason}</TableCell>
            <TableCell className='text-center'>{moment(refundRequest.requestDate).format('HH:mm DD/MM/YYYY')}</TableCell>
            <TableCell className='text-center'>
              <RefundRequestStatusBadge status={refundRequest.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default RefundRequestTable

export const RefundRequestTableSkeleton = ({ pageSize }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>#</TableHead>
          <TableHead>Mã đơn hàng</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead>Sản phẩm</TableHead>
          <TableHead>Lý do</TableHead>
          <TableHead className='text-center'>Ngày yêu cầu</TableHead>
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
            <TableCell>
              <Skeleton className='h-4 w-40' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-32' />
            </TableCell>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-4 w-32' />
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
