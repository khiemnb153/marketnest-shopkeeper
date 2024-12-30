'use client'

import useFetch from '@hooks/use-fetch'

import AppWrapper from '@components/app-wrapper'
import ShopEditForm from './form'

const ProfileEditPage = () => {
  const { data, error, isLoading } = useFetch(`/shopkeepers/me`)

  const renderForm = () => {
    if (isLoading) {
      return <span className='animate-pulse text-center'>Đang tải...</span>
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

    return <ShopEditForm shop={data} />
  }

  return (
    <AppWrapper
      title='Chỉnh sửa hồ sơ'
      routeTree={[{ url: '/profile', name: 'Hồ sơ cửa hàng' }]}
    >
      {renderForm()}
    </AppWrapper>
  )
}

export default ProfileEditPage
