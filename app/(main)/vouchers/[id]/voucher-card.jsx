'use client'

import currency from '@lib/currency'
import moment from 'moment/moment'
import { mutate, useSWRConfig } from 'swr'
import { toast } from 'sonner'
import { useRouter } from '@node_modules/next/navigation'

import { Calendar, Percent, Ticket, Play, Ban, Pencil, Trash2 } from 'lucide-react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { Button } from '@components/ui/button'
import ConfirmationButton from '@components/confirmation-button'
import { Skeleton } from '@components/ui/skeleton'
import Link from '@node_modules/next/link'

import VoucherStatusBadge from '../voucher-status-badge'

const VoucherCard = ({ voucher }) => {
  const router = useRouter()
  const { accessToken } = useSWRConfig()

  console.log(voucher)

  const handleChangeStatus = async (newStatus) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + `/discounts/${voucher.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })

    if (!res.ok) {
      toast.error(`Cập nhật trạng thái khuyến mãi thất bại. Code: ${res.status}`)
      console.log(await res.json())

      return
    }

    toast.success(`Cập nhật trạng thái khuyến mãi thành công.`)
    mutate(`/discounts/${voucher.id}`)
  }

  const handleDelete = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + `/discounts/${voucher.id}/permanently`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      toast.error(`Xóa khuyến mãi khuyến mãi thất bại. Code: ${res.status}`)
      console.log(await res.json())

      return
    }

    toast.success(`Xóa khuyến mãi khuyến mãi thành công.`)
    router.push('/vouchers')
  }

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>{voucher.campaign}</span>
          <VoucherStatusBadge
            status={voucher.status}
            variant='default'
          />
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-muted-foreground'>{voucher.description}</p>
        <div className='flex items-center space-x-2'>
          <Ticket className='h-5 w-5 text-muted-foreground' />
          <span className='font-semibold'>{voucher.code}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <Percent className='h-5 w-5 text-muted-foreground' />
          <span>
            Giảm {voucher.discountPercentage}%
            {!!voucher.conditions && (
              <>
                {!!voucher.conditions.max_value && ` tối đa ${currency.format(voucher.conditions.max_value)}`}
                {!!voucher.conditions.min_value && ` đơn tối thiểu ${currency.format(voucher.conditions.min_value)}`}
              </>
            )}
          </span>
        </div>
        <div className='flex items-center space-x-2'>
          <Calendar className='h-5 w-5 text-muted-foreground' />
          <span>Hết hạn: {moment(voucher.validUntil).format('HH:mm DD/MM/YYYY')}</span>
        </div>
      </CardContent>
      <CardFooter className='items-center justify-between'>
        <span className='text-sm text-muted-foreground'>
          Đã sử dụng: {voucher.used}/{voucher.quantity}
        </span>
        <div className='flex gap-2'>
          <Button
            size='icon'
            variant='secondary'
            asChild
          >
            <Link href={`/vouchers/${voucher.id}/edit`}>
              <Pencil />
            </Link>
          </Button>
          <ConfirmationButton
            size='icon'
            variant='destructive'
            title='Xác nhận'
            prompt={`Bạn có chắc chắn muốn XÓA khuyến mãi này không?`}
            onConfirm={() => {
              handleDelete()
            }}
          >
            <Trash2 />
          </ConfirmationButton>
          <ConfirmationButton
            variant={voucher.status.toUpperCase() == 'INACTIVE' ? 'default' : 'destructive'}
            title='Xác nhận'
            prompt={`Bạn có chắc chắn muốn ${voucher.status.toUpperCase() == 'INACTIVE' ? 'KÍCH HOẠT' : 'DỪNG'} khuyến mãi này không?`}
            onConfirm={() => {
              handleChangeStatus(voucher.status.toUpperCase() == 'INACTIVE' ? 'Active' : 'Inactive')
            }}
          >
            {voucher.status.toUpperCase() == 'INACTIVE' ? (
              <>
                <Play />
                Kích hoạt
              </>
            ) : (
              <>
                <Ban />
                Dừng
              </>
            )}
          </ConfirmationButton>
        </div>
      </CardFooter>
    </Card>
  )
}

export default VoucherCard

export const VoucherCardSkeleton = () => {
  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-6 w-20' />
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-5 w-5 rounded-full' />
          <Skeleton className='h-5 w-24' />
        </div>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-5 w-5 rounded-full' />
          <Skeleton className='h-5 w-48' />
        </div>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-5 w-5 rounded-full' />
          <Skeleton className='h-5 w-40' />
        </div>
      </CardContent>
      <CardFooter className='justify-between'>
        <Skeleton className='h-4 w-32' />
        <Skeleton className='h-4 w-24' />
      </CardFooter>
    </Card>
  )
}
