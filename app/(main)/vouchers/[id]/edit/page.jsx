'use client'

import { use } from 'react'
import useFetch from '@hooks/use-fetch'
import { mutate, useSWRConfig } from 'swr'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import AppWrapper from '@components/app-wrapper'
import VoucherForm from '../../voucher-form'
import { VoucherCardSkeleton } from '../voucher-card'

const EditVoucherPage = ({ params }) => {
  const router = useRouter()
  const { accessToken } = useSWRConfig()
  const { id } = use(params)

  const { data, error, isLoading } = useFetch(`/discounts/${id}`)

  const handleUpdateVoucher = async (data) => {
    console.log(data)
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + `/discounts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      toast.error(`Cập nhật khuyến mãi thất bại. Code: ${res.status}`)
      console.log(await res.json())

      return
    }

    toast.success(`Cập nhật khuyến mãi thành công.`)
    router.push(`/vouchers/${id}`)

    // setTimeout(() => {
    // }, 300);
  }

  const renderVoucher = () => {
    if (isLoading) {
      return <VoucherCardSkeleton />
    }

    if (error) {
      return (
        <span>
          Something went wrong!!!
          <br />
          Code: {error.status}
        </span>
      )
    }

    return (
      <VoucherForm
        defaultValues={data.discount}
        title={'Chỉnh sửa khuyến mãi'}
        description={'Cập nhật những thông tin cần thiết cho khuyến mãi'}
        mode={'edit'}
        onSubmit={handleUpdateVoucher}
      />
    )
  }

  return (
    <AppWrapper
      title='Chỉnh sửa khuyến mãi'
      routeTree={[
        { url: '/vouchers', name: 'Quản lý khuyến mãi' },
        { url: `/vouchers/${id}`, name: 'Chi tiết khuyến mãi' },
      ]}
      className='flex flex-col gap-4'
    >
      {renderVoucher()}
    </AppWrapper>
  )
}

export default EditVoucherPage
