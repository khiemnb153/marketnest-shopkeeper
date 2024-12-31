'use client'

import useFetch from '@hooks/use-fetch'

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@components/ext/multi-select'

const CategoriesSelector = ({ values, onValuesChange }) => {
  const { data, error, isLoading } = useFetch(`/categories`)

  const renderOptions = () => {
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

    return (
      <MultiSelectorList>
        {data.productCategories.map((category) => (
          <MultiSelectorItem
            key={category.id}
            value={category.id}
          >
            {category.name}
          </MultiSelectorItem>
        ))}
      </MultiSelectorList>
    )
  }

  return (
    <MultiSelector
      onValuesChange={onValuesChange}
      values={values}
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder='Chọn các danh mục' />
      </MultiSelectorTrigger>
      <MultiSelectorContent>{renderOptions()}</MultiSelectorContent>
    </MultiSelector>
  )
}

export default CategoriesSelector
