import { useRouter } from 'next/navigation'
import { getAbbreviationName } from '@lib/utils'
import currency from '@lib/currency'
import moment from 'moment/moment'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Skeleton } from '@components/ui/skeleton'

import VoucherStatusBadge from './voucher-status-badge'

const VoucherTable = ({ vouchers, searchParams }) => {
  const router = useRouter()

  console.log(vouchers)

  const { pageIndex, pageSize } = searchParams

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>#</TableHead>
          <TableHead>Mã</TableHead>
          <TableHead>Chiến dịch</TableHead>
          <TableHead>Ưu đãi</TableHead>
          <TableHead>Hạn sử dụng</TableHead>
          <TableHead className='text-center'>Đã sử dụng</TableHead>
          <TableHead className='text-center'>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vouchers.map((voucher, index) => (
          <TableRow
            key={voucher.id}
            className='cursor-pointer'
            onClick={() => {
              router.push(`/vouchers/${voucher.id}`)
            }}
          >
            <TableCell className='text-center'>{(pageIndex - 1) * pageSize + index + 1}</TableCell>

            <TableCell>{voucher.code}</TableCell>
            <TableCell>{voucher.campaign}</TableCell>
            <TableCell>
              Giảm {voucher.discountPercentage}%
              {!!voucher.conditions && (
                <>
                  {!!voucher.conditions.max_value && ` tối đa ${currency.format(voucher.conditions.max_value)}`}
                  {!!voucher.conditions.min_value && ` đơn tổi thiểu ${currency.format(voucher.conditions.min_value)}`}
                </>
              )}
            </TableCell>
            <TableCell>{moment(voucher.validUntil).format('HH:mm DD/MM/YYYY')}</TableCell>
            <TableCell className='text-center'>
              {voucher.used}/{voucher.quantity}
            </TableCell>
            <TableCell className='text-center'>
              <VoucherStatusBadge status={voucher.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const VoucherTableSkeleton = ({ pageSize }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>#</TableHead>
          <TableHead>Mã</TableHead>
          <TableHead>Chiến dịch</TableHead>
          <TableHead>Ưu đãi</TableHead>
          <TableHead>Hạn sử dụng</TableHead>
          <TableHead className='text-center'>Đã sử dụng</TableHead>
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
              <Skeleton className='h-4 w-20' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-32' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-48' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-32' />
            </TableCell>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-4 w-16' />
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

export default VoucherTable
