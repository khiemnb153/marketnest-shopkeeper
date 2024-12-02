'use client'

import { Trash2 } from 'lucide-react'

import { Button } from '@components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@components/ui/dialog'

const ConfirmationButton = ({ title, prompt, onConfirm, children, ...btnProps }) => {
  // TODO: Use Alert Dialog instead
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...btnProps}>{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className='py-4'>
          <p>{prompt}</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='submit'
              variant='destructive'
              onClick={onConfirm}
            >
              Xác nhận
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type='button'
              variant='secondary'
            >
              Hủy
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationButton
