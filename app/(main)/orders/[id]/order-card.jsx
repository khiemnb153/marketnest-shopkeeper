import currency from '@lib/currency'
import moment from 'moment/moment'
import { mutate, useSWRConfig } from 'swr'
import { toast } from 'sonner'

import { X, Check } from 'lucide-react'

import ConfirmationButton from '@components/confirmation-button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@components/ui/skeleton'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@components/ui/table'
import Image from 'next/image'
import OrderStatusBadge from '../order-status-badge'

const OrderCard = ({ order }) => {
  console.log(order)

  const { accessToken } = useSWRConfig()

  const handleChangeStatus = async (newStatus) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + `/orders/${order.id}/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })

    if (!res.ok) {
      toast.error(`Cập nhật trạng thái đơn hàng thất bại. Code: ${res.status}`)
      console.log(await res.json())

      return
    }

    toast.success(`Cập nhật trạng thái đơn hàng thành công.`)
    mutate(`/orders/${order.id}`)
  }

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <Card>
        <CardHeader>
          <CardTitle>Thông tin đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='pb-1'>
            <span className='inline-block w-[200px] font-bold'>Mã đơn hàng:</span> {order.id.split('-').pop().toUpperCase()}
          </div>
          <div className='py-1'>
            <span className='inline-block w-[200px] font-bold'>Ngày tạo đơn:</span>{' '}
            {moment(order.createdAt).format('HH:mm DD/MM/YYYY')}
          </div>
          <div className='py-1'>
            <span className='inline-block w-[200px] font-bold'>Trạng thái:</span>{' '}
            <OrderStatusBadge
              status={order.orderStatus}
              variant='default'
            />
          </div>
          <div className='py-1'>
            <span className='inline-block w-[200px] font-bold'>Trạng thái thanh toán:</span>{' '}
            <Badge variant='outline'>{order.paymentStatus == 'Paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</Badge>
          </div>
          <div className='pt-1'>
            <span className='inline-block w-[200px] font-bold'>Phương thức thanh toán:</span> {order.paymentMethod}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin vận chuyển</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='pb-1'>
            <span className='inline-block w-[200px] font-bold'>Địa chỉ:</span> {order.address.street}, {order.address.city},{' '}
            {order.address.country}
          </div>
          <div className='py-1'>
            <span className='inline-block w-[200px] font-bold'>Mã bưu chính:</span> {order.address.postalCode}
          </div>
          <div className='pt-1'>
            <span className='inline-block w-[200px] font-bold'>Đơn vị vận chuyển:</span> {order.shippingMethod.name} (
            {order.shippingMethod.type})
          </div>
        </CardContent>
      </Card>

      {/* ["Waiting_Verify", "Waiting_Get", "Waiting_Delivery","In_Delivery","Delivery_Failed","Completed","Cancelled"] */}
      <div className='flex flex-row justify-end gap-4 md:col-span-2'>
        {order.orderStatus == 'Waiting_Verify' && (
          <>
            <ConfirmationButton
              title='Xác nhận'
              prompt='Bạn có chắc chắn muốn từ chối đơn hàng này không?'
              variant='destructive'
              onConfirm={() => handleChangeStatus('Cancelled')}
            >
              <X /> Từ chối
            </ConfirmationButton>

            <ConfirmationButton
              title='Xác nhận'
              prompt='Bạn có chắc chắn muốn xác nhận đơn hàng này không?'
              onConfirm={() => handleChangeStatus('Waiting_Get')}
            >
              <Check /> Xác nhận
            </ConfirmationButton>
          </>
        )}
        {order.orderStatus == 'Waiting_Get' && (
          <ConfirmationButton
            title='Xác nhận'
            prompt='Bạn có chắc chắn đã sẵn sàng để chuyển đơn hàng này cho đơn vị vận chuyển không?'
            onConfirm={() => handleChangeStatus('Waiting_Delivery')}
          >
            <Check /> Đánh dấu hàng đã sẵn sàng
          </ConfirmationButton>
        )}
        {order.orderStatus == 'Waiting_Delivery' && (
          <ConfirmationButton
            title='Xác nhận'
            prompt='Bạn có chắc chắn đã chuyển đơn hàng này cho đơn vị vận chuyển không?'
            onConfirm={() => handleChangeStatus('In_Delivery')}
          >
            <Check /> Đánh dấu đã chuyển hàng cho đơn vị vận chuyển
          </ConfirmationButton>
        )}
      </div>

      <Card className='md:col-span-2'>
        <CardHeader>
          <CardTitle>Chi tiết</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead className='text-right'>Số lượng</TableHead>
                <TableHead className='text-right'>Giá</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderDetails.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className='flex items-center gap-2 font-bold'>
                    <Image
                      src={item.product?.images[0] || 'https://placehold.co/36/png'}
                      alt={item.product?.name}
                      width={36}
                      height={36}
                      className='aspect-square h-9 rounded-md object-cover'
                    />
                    {item.product?.name}
                  </TableCell>
                  <TableCell className='text-right'>{item.quantity}</TableCell>
                  <TableCell className='text-right'>{currency.format(item.price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className='md:col-span-2'>
        <CardHeader>
          <CardTitle>Tổng quan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex justify-between pb-1'>
            <span className='inline-block w-[200px] font-bold'>Tổng sản phẩm:</span> {currency.format(order.totalAmount)}
          </div>
          {JSON.stringify(order.discount) != '{}' && (
            <div className='flex justify-between py-1'>
              <span className='inline-block w-[200px] font-bold'>Khuyến mãi:</span> -
              {currency.format((order.discount.discountPercentage * order.totalAmount) / 100.0)}
            </div>
          )}
          <div className='flex justify-between py-1'>
            <span className='inline-block w-[200px] font-bold'>Phí vận chuyển:</span> {currency.format(order.shippingFee)}
          </div>

          <div className='flex justify-between pt-1 font-bold'>
            <span className='inline-block w-[200px]'>Tổng cộng:</span>{' '}
            {currency.format(
              order.shippingFee +
                order.totalAmount -
                (JSON.stringify(order.discount) != '{}' ? (order.discount.discountPercentage * order.totalAmount) / 100.0 : 0)
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderCard

export const OrderCardSkeleton = () => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <Card>
        <CardHeader>
          <CardTitle>Thông tin đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`${index === 0 ? 'pb-1' : index === 4 ? 'pt-1' : 'py-1'}`}
            >
              <Skeleton className='inline-block h-5 w-[200px]' />
              <Skeleton className='ml-2 inline-block h-5 w-[150px]' />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin vận chuyển</CardTitle>
        </CardHeader>
        <CardContent>
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`${index === 0 ? 'pb-1' : index === 2 ? 'pt-1' : 'py-1'}`}
            >
              <Skeleton className='inline-block h-5 w-[200px]' />
              <Skeleton className='ml-2 inline-block h-5 w-[150px]' />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className='flex flex-row justify-end gap-4 md:col-span-2'>
        <Skeleton className='h-10 w-24' />
        <Skeleton className='h-10 w-24' />
      </div>

      <Card className='md:col-span-2'>
        <CardHeader>
          <CardTitle>Chi tiết</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead className='text-right'>Số lượng</TableHead>
                <TableHead className='text-right'>Giá</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(3)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell className='flex items-center gap-2'>
                    <Skeleton className='h-9 w-9 rounded-md' />
                    <Skeleton className='h-5 w-32' />
                  </TableCell>
                  <TableCell className='text-right'>
                    <Skeleton className='ml-auto h-5 w-12' />
                  </TableCell>
                  <TableCell className='text-right'>
                    <Skeleton className='ml-auto h-5 w-20' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className='md:col-span-2'>
        <CardHeader>
          <CardTitle>Tổng quan</CardTitle>
        </CardHeader>
        <CardContent>
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`flex justify-between ${index === 0 ? 'pb-1' : index === 2 ? 'pt-1' : 'py-1'}`}
            >
              <Skeleton className='h-5 w-[200px]' />
              <Skeleton className='h-5 w-[100px]' />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
