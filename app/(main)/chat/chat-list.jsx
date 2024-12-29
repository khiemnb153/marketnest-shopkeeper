'use client'

import { useState } from 'react'
import { getAbbreviationName } from '@lib/utils'
import useFetch from '@hooks/use-fetch'
import { cn } from '@lib/utils'

import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@components/ui/scroll-area'
import { Skeleton } from '@components/ui/skeleton'

const ChatList = ({ currentChat, setCurrentChat }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data, error, isLoading } = useFetch('/chats/shopkeeper')

  const renderChatList = () => {
    if (isLoading) {
      return [...Array(10)].map((_, index) => (
        <div
          key={`chatItemSkeleton${index}`}
          className='my-2 flex h-[unset] w-full flex-row gap-3 p-3 first:mt-0 last:mb-0'
        >
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='flex-grow'>
            <Skeleton className='mb-2 h-4 w-3/4' />
            <Skeleton className='h-3 w-1/2' />
          </div>
        </div>
      ))
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

    return data.chat_rooms.chatsRooms
      .filter((c) => c.user.username.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((chat) => (
        <Button
          variant={currentChat?.id == chat.id ? 'secondary' : 'outline'}
          className={cn('my-2 flex h-[unset] w-full flex-row gap-3 p-3 first:mt-0 last:mb-0')}
          key={chat.id}
          onClick={() => setCurrentChat(chat)}
        >
          <Avatar>
            <AvatarImage
              src={chat.user.avatar}
              alt={chat.user.username}
            />
            <AvatarFallback>{getAbbreviationName(chat.user.username || 'User')}</AvatarFallback>
          </Avatar>
          <div className='flex-grow text-left'>
            {chat.lastMessage.createdBy == chat.shop.owner.id ? (
              <>
                <p className={`font-medium leading-none`}>{chat.user.username}</p>
                <p className={`text-sm text-muted-foreground`}>Bạn: {chat.lastMessage.message}</p>
              </>
            ) : (
              <>
                <p className={`${chat.lastMessage.isRead ? 'font-medium' : 'font-bold'} leading-none`}>{chat.user.username}</p>
                <p className={`text-sm text-muted-foreground ${chat.lastMessage.isRead ? '' : 'font-bold'}`}>
                  {chat.lastMessage.message}
                </p>
              </>
            )}
          </div>
        </Button>
      ))
  }

  return (
    <div className='flex min-w-80 flex-col gap-4'>
      <div className='relative'>
        <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Search users'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
          className='pl-8'
        />
      </div>
      <ScrollArea className='flex flex-col'>{renderChatList()}</ScrollArea>
    </div>
  )
}

export default ChatList
