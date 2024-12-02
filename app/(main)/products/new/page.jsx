'use client'

import { useSWRConfig } from 'swr'
import useFetch from '@hooks/use-fetch'
import { use } from 'react'
import { buildUrl } from '@lib/utils'
import currency from '@lib/currency'

import { Star, Edit, Trash2 } from 'lucide-react'

import AppWrapper from '@components/app-wrapper'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/ui/carousel'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardTitle, CardHeader } from '@components/ui/card'
import Image from 'next/image'

import CategoriesSelect from './categories-select'

const NewProductPage = () => {
  return (
    <AppWrapper
      title='Thêm sản phẩm'
      routeTree={[{ url: '/products', name: 'Quản lý sản phẩm' }]}
    >
      <CategoriesSelect />
    </AppWrapper>
  )
}

export default NewProductPage
