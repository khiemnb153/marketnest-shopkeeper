'use client'

import { useSession } from 'next-auth/react'
import { mutate, useSWRConfig } from 'swr'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import AppWrapper from '@components/app-wrapper'
import VoucherForm from '../voucher-form'

const NewVoucherPage = () => {
  const { data: session } = useSession()

  const router = useRouter()
  const { accessToken } = useSWRConfig()

  const handleCreateVoucher = async (data) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + `/discounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...data, shopId: session.shop.id }),
    })

    if (!res.ok) {
      toast.error(`Cập nhật khuyến mãi thất bại. Code: ${res.status}`)
      console.log(await res.json())

      return
    }

    toast.success(`Cập nhật khuyến mãi thành công.`)

    router.push(`/vouchers/${(await res.json()).data.id}`)
  }

  return (
    <AppWrapper
      title='Thêm khuyến mãi'
      routeTree={[{ url: '/vouchers', name: 'Quản lý khuyến mãi' }]}
      className='flex flex-col gap-4'
    >
      <VoucherForm
        title={'Thêm mã khuyến mãi'}
        description={'Điền những thông tin cần thiết cho khuyến mãi'}
        mode={'create'}
        onSubmit={handleCreateVoucher}
      />
    </AppWrapper>
  )
}

export default NewVoucherPage
