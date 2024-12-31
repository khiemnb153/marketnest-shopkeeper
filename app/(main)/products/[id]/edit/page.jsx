'use client'

import { use, useState } from 'react'
import useFetch from '@hooks/use-fetch'
import { postImage } from '@lib/post-media'
import { useRouter } from 'next/navigation'
import { mutate, useSWRConfig } from 'swr'
import { toast } from 'sonner'

import AppWrapper from '@components/app-wrapper'
import ProductForm, { ProductFormSkeleton } from '../../product-form'

const ProductEditPage = ({ params }) => {
  const { id } = use(params)
  const { accessToken } = useSWRConfig()
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const { data, error, isLoading } = useFetch(`/products/${id}`)

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

    console.log(uploadedUrls)

    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + `/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        ...data,
        categoryIds: data.categories.map((cat) => cat.value),
        imageUrls: uploadedUrls,
      }),
    })

    setSubmitting(false)

    if (!res.ok) {
      toast.error(`Chỉnh sửa sản phẩm thất bại. Code: ${res.status}`)
      return
    }

    toast.success('Chỉnh sửa sản phẩm thành công')

    mutate('/products/' + id)
    router.push('/products/' + id)
  }

  const renderProduct = () => {
    if (isLoading) {
      return <ProductFormSkeleton />
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
      <ProductForm
        onSubmit={onSubmit}
        defaultValues={{
          ...data.product,
          images: data.product.images
            .sort((a, b) => a.order - b.order)
            .map((image) => ({
              preview: image.imageUrl,
              uploaded: true,
              id: image.id,
            })),
          categories: data.product.categories.map((cat) => ({ value: cat.id, label: cat.name })),
        }}
        submitting={submitting}
        actionLabel={'Cập nhật'}
      />
    )
  }

  return (
    <AppWrapper
      title='Chỉnh sửa sản phẩm'
      routeTree={[{ url: '/products', name: 'Quản lý sản phẩm' }]}
      className='flex flex-col gap-4'
    >
      {renderProduct()}
    </AppWrapper>
  )
}

export default ProductEditPage
