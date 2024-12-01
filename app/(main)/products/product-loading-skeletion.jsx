import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { Skeleton } from '@components/ui/skeleton'

const ProductLoadingSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>#</TableHead>
          <TableHead>Sản phẩm</TableHead>
          <TableHead className='text-right'>Giá</TableHead>
          <TableHead className='text-center'>Có sẵn</TableHead>
          <TableHead className='text-center'>Rating</TableHead>
          <TableHead className='text-center'>Trạng thái</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-4 w-4' />
            </TableCell>
            <TableCell>
              <div className='flex flex-row items-center gap-2'>
                <Skeleton className='h-8 w-8 rounded-lg' />
                <Skeleton className='h-4 w-32' />
              </div>
            </TableCell>
            <TableCell className='text-right'>
              <Skeleton className='ml-auto h-4 w-16' />
            </TableCell>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-4 w-8' />
            </TableCell>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-4 w-8' />
            </TableCell>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-6 w-16' />
            </TableCell>
            <TableCell>
              <Skeleton className='ml-auto h-8 w-8 rounded-full' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProductLoadingSkeleton
