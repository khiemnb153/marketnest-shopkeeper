import currency from '@lib/currency'

import { EllipsisVertical, Pencil, Info } from 'lucide-react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@components/ui/hover-card'
import Link from 'next/link'
import Image from 'next/image'

import CommonPagination from '@components/common-pagination'

const VoucherTable = ({ data, searchParams }) => {
  const { pageIndex, pageSize } = searchParams
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>#</TableHead>
            <TableHead>Mã</TableHead>
            <TableHead>Chiến dịch</TableHead>
            <TableHead className='text-center'>Đã sử dụng</TableHead>
            <TableHead className='text-center'>Trạng thái</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.vouchers.map((voucher, index) => (
            <TableRow key={voucher.id}>
              <TableCell className='text-center'>{(pageIndex - 1) * pageSize + index + 1}</TableCell>
              <TableCell className='font-medium'>#{voucher.code}</TableCell>
              <TableCell>{voucher.campaign}</TableCell>
              <TableCell className='text-center'>
                {voucher.used}/{voucher.limits}
              </TableCell>
              <TableCell className='text-center'>
                <Badge
                  variant='outline'
                  className='border-green-600 text-green-600 dark:border-green-500 dark:text-green-500'
                >
                  {voucher.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='h-8 w-8 p-2'
                    >
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/vouchers/${voucher.id}`}
                          className='cursor-pointer'
                        >
                          <Info /> Chi tiết
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/vouchers/${voucher.id}/edit`}
                          className='cursor-pointer'
                        >
                          <Pencil /> Sửa
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CommonPagination
        route='/vouchers'
        searchParams={searchParams}
        totalPages={data.data.totalPages}
      />
    </>
  )
}

export default VoucherTable
