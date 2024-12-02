import { buildUrl } from '@lib/utils'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from '@components/ui/pagination'

const CommonPagination = ({ route, searchParams, totalPages }) => {
  const { pageIndex, pageSize, searchName } = searchParams

  const renderPageLink = (pageNumber) => (
    <PaginationItem key={`page${pageNumber}`}>
      <PaginationLink
        href={buildUrl(route, {
          pageIndex: pageNumber,
          pageSize: pageSize,
          searchName: searchName,
        })}
        isActive={pageNumber == pageIndex}
      >
        {pageNumber}
      </PaginationLink>
    </PaginationItem>
  )

  const renderEllipsis = () => (
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
  )

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildUrl('/products', {
              pageIndex: pageIndex - 1,
              pageSize: pageSize,
              searchName: searchName,
            })}
            onClick={(e) => {
              if (pageIndex == 1) e.preventDefault()
            }}
          />
        </PaginationItem>

        {renderPageLink(1)}

        {pageIndex > 3 && renderEllipsis()}

        {pageIndex > 2 && renderPageLink(pageIndex - 1)}
        {pageIndex != 1 && pageIndex != totalPages && renderPageLink(pageIndex)}
        {pageIndex < totalPages - 1 && renderPageLink(pageIndex + 1)}

        {pageIndex < totalPages - 2 && renderEllipsis()}

        {totalPages !== 1 && renderPageLink(totalPages)}

        <PaginationItem>
          <PaginationNext
            href={buildUrl('/products', {
              pageIndex: pageIndex + 1,
              pageSize: pageSize,
              searchName: searchName,
            })}
            onClick={(e) => {
              if (pageIndex == totalPages) e.preventDefault()
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default CommonPagination
