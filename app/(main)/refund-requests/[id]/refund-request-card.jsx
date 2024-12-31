import { useState } from 'react'
import currency from '@lib/currency'
import moment from 'moment/moment'
import { mutate, useSWRConfig } from 'swr'
import { toast } from 'sonner'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@components/ui/separator'
import { Skeleton } from '@components/ui/skeleton'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@components/ui/table'
import Image from 'next/image'
import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import RefundRequestStatusBadge from '../refund-request-status-badge'

const RefundRequestCard = ({ refundRequest }) => {
  const [reply, setReply] = useState('')

  const { accessToken } = useSWRConfig()

  const handleChangeStatus = async (newStatus) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + `/refund-requests/${refundRequest.id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status: newStatus, shopkeeperReply: reply }),
    })

    if (!res.ok) {
      toast.error(`Cập nhật trạng thái yêu cầu hoàn trả thất bại. Code: ${res.status}`)
      console.log(await res.json())

      return
    }

    toast.success(`Cập nhật trạng thái yêu cầu hoàn trả thành công.`)
    mutate(`/refund-requests/${refundRequest.id}`)
  }

  return (
    <Card className='w-full max-w-2xl'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Yêu cầu cho đơn hàng #{refundRequest.order.id.split('-').pop().toUpperCase()}</span>
          <RefundRequestStatusBadge
            status={refundRequest.status}
            variant='default'
          />
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='flex gap-4 overflow-x-auto pb-2'>
          {refundRequest.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Product image ${index + 1}`}
              width={100}
              height={100}
              className='rounded-md object-cover'
            />
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Khách hàng:</span>
            {refundRequest.user.displayName}
          </div>
          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Ngày mua:</span>
            {moment(refundRequest.order.createdAt).format('HH:mm DD/MM/YYYY')}
          </div>

          <Separator />

          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Sản phẩm:</span>
            {refundRequest.product.name}
          </div>

          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Giá:</span>
            {currency.format(refundRequest.price)}
          </div>

          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Số lượng:</span>
            {refundRequest.quantity}
          </div>

          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Tổng hoàn trả:</span>
            {currency.format(refundRequest.price * refundRequest.quantity)}
          </div>

          <Separator />

          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Lý do:</span>
            {refundRequest.refundReason}
          </div>
          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Ngày tạo yêu cầu</span>
            {moment(refundRequest.requestlDate).format('HH:mm DD/MM/YYYY')}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {refundRequest.status == 'Pending' ? (
          <div className='flex w-full justify-end gap-2'>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='destructive'>Từ chối</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Từ chối yêu cầu</DialogTitle>
                  <DialogDescription>Hãy cho biết phản hồi của bạn.</DialogDescription>
                </DialogHeader>
                <div className='flex flex-col items-start gap-1'>
                  <Label htmlFor='reply'>Phản hồi</Label>
                  <Input
                    id='reply'
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className='col-span-3'
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type='submit'
                      variant='secondary'
                      disabled={reply == ''}
                      onClick={() => {
                        handleChangeStatus('Accepted')
                      }}
                    >
                      Gửi
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={() => setReply('')}>Hủy</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant='secondary'>Chấp nhận</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Chấp nhận yêu cầu</DialogTitle>
                  <DialogDescription>Hãy cho biết phản hồi của bạn.</DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='reply'>Phản hồi</Label>
                    <Input
                      id='reply'
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      className='col-span-3'
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type='submit'
                      variant='secondary'
                      disabled={reply == ''}
                      onClick={() => {
                        handleChangeStatus('Accepted')
                      }}
                    >
                      Gửi
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={() => setReply('')}>Hủy</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className='flex w-full flex-col gap-2'>
            <Separator />
            <div className='flex justify-between'>
              <span className='inline-block w-[200px] font-bold'>Phản hồi của bạn:</span>
              {refundRequest.shopkeeperReply}
            </div>
            <div className='flex justify-between'>
              <span className='inline-block w-[200px] font-bold'>Ngày xử lý:</span>
              {moment(refundRequest.updatedAt).format('HH:mm DD/MM/YYYY')}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default RefundRequestCard

export const RefundRequestCardSkeleton = () => {
  return (
    <Card className='w-full max-w-2xl'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <Skeleton className='h-6 w-[200px]' />
          <Skeleton className='h-6 w-[100px]' />
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='flex gap-4 overflow-x-auto pb-2'>
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              className='h-[100px] w-[100px] rounded-md'
            />
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Khách hàng:</span>
            <Skeleton className='h-4 w-[150px]' />
          </div>
          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Ngày mua:</span>
            <Skeleton className='h-4 w-[150px]' />
          </div>

          <Separator />

          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Sản phẩm:</span>
            <Skeleton className='h-4 w-[150px]' />
          </div>

          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Giá:</span>
            <Skeleton className='h-4 w-[100px]' />
          </div>

          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Số lượng:</span>
            <Skeleton className='h-4 w-[50px]' />
          </div>

          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Tổng hoàn trả:</span>
            <Skeleton className='h-4 w-[100px]' />
          </div>

          <Separator />

          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Lý do:</span>
            <Skeleton className='h-4 w-[200px]' />
          </div>
          <div className='flex justify-between'>
            <span className='inline-block w-[200px] font-bold'>Ngày tạo yêu cầu</span>
            <Skeleton className='h-4 w-[150px]' />
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end gap-2'>
        <Skeleton className='h-10 w-24' />
        <Skeleton className='h-10 w-24' />
      </CardFooter>
    </Card>
  )
}
