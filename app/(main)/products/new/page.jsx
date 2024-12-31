'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { postImage } from '@lib/post-media'
import { useRouter } from 'next/navigation'
import { useSWRConfig } from 'swr'
import { toast } from 'sonner'

import AppWrapper from '@components/app-wrapper'
import ProductForm from '../product-form'

const NewProductPage = () => {
  const { data: session } = useSession()
  const { accessToken } = useSWRConfig()

  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()

  const onSubmit = async (data) => {
    setSubmitting(true)

    const uploadPromises = data.images.map((image) => {
      if (!image.uploaded) {
        return postImage(image.src, accessToken)
      } else {
        return Promise.resolve(image.preview)
      }
    })

    const uploadedUrls = await Promise.all(uploadPromises)

    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        ...data,
        shopId: session.shop.id,
        categoryIds: data.categories.map((cat) => cat.value),
        imageUrls: uploadedUrls,
      }),
    })

    setSubmitting(false)

    if (!res.ok) {
      toast.error(`Đăng sản phẩm thất bại. Code: ${res.status}`)
      return
    }

    toast.success('Đăng sản phẩm thành công')

    router.push('/products/' + (await res.json()).data.product.id)
  }

  return (
    <AppWrapper
      title='Thêm sản phẩm'
      routeTree={[{ url: '/products', name: 'Quản lý sản phẩm' }]}
    >
      <ProductForm
        onSubmit={onSubmit}
        submitting={submitting}
        actionLabel={'Đăng bán'}
      />
    </AppWrapper>
  )
}

export default NewProductPage
