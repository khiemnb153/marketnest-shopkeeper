'use client'

import { useState, useEffect } from 'react'
import { cn } from '@lib/utils'

import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Search, MessageCircle } from 'lucide-react'
import { ScrollArea } from '@components/ui/scroll-area'

// Mock data for chats
const chats = [
  { id: 1, name: 'Alice Johnson', lastMessage: "Hey, how's it going?", avatar: '/avatars/alice.jpg' },
  { id: 2, name: 'Bob Smith', lastMessage: 'Can we meet tomorrow?', avatar: '/avatars/bob.jpg' },
  { id: 3, name: 'Carol Williams', lastMessage: 'Thanks for your help!', avatar: '/avatars/carol.jpg' },
  { id: 4, name: 'David Brown', lastMessage: "I'll send you the files soon.", avatar: '/avatars/david.jpg' },
  { id: 5, name: 'Eva Davis', lastMessage: 'Looking forward to the weekend!', avatar: '/avatars/eva.jpg' },
  { id: 11, name: 'Alice Johnson', lastMessage: "Hey, how's it going?", avatar: '/avatars/alice.jpg' },
  { id: 12, name: 'Bob Smith', lastMessage: 'Can we meet tomorrow?', avatar: '/avatars/bob.jpg' },
  { id: 13, name: 'Carol Williams', lastMessage: 'Thanks for your help!', avatar: '/avatars/carol.jpg' },
  { id: 14, name: 'David Brown', lastMessage: "I'll send you the files soon.", avatar: '/avatars/david.jpg' },
  { id: 15, name: 'Eva Davis', lastMessage: 'Looking forward to the weekend!', avatar: '/avatars/eva.jpg' },
  { id: 21, name: 'Alice Johnson', lastMessage: "Hey, how's it going?", avatar: '/avatars/alice.jpg' },
  { id: 22, name: 'Bob Smith', lastMessage: 'Can we meet tomorrow?', avatar: '/avatars/bob.jpg' },
  { id: 23, name: 'Carol Williams', lastMessage: 'Thanks for your help!', avatar: '/avatars/carol.jpg' },
  { id: 24, name: 'David Brown', lastMessage: "I'll send you the files soon.", avatar: '/avatars/david.jpg' },
  { id: 25, name: 'Eva Davis', lastMessage: 'Looking forward to the weekend!', avatar: '/avatars/eva.jpg' },
  { id: 31, name: 'Alice Johnson', lastMessage: "Hey, how's it going?", avatar: '/avatars/alice.jpg' },
  { id: 32, name: 'Bob Smith', lastMessage: 'Can we meet tomorrow?', avatar: '/avatars/bob.jpg' },
  { id: 33, name: 'Carol Williams', lastMessage: 'Thanks for your help!', avatar: '/avatars/carol.jpg' },
  { id: 34, name: 'David Brown', lastMessage: "I'll send you the files soon.", avatar: '/avatars/david.jpg' },
  { id: 35, name: 'Eva Davis', lastMessage: 'Looking forward to the weekend!', avatar: '/avatars/eva.jpg' },
  { id: 41, name: 'Alice Johnson', lastMessage: "Hey, how's it going?", avatar: '/avatars/alice.jpg' },
  { id: 42, name: 'Bob Smith', lastMessage: 'Can we meet tomorrow?', avatar: '/avatars/bob.jpg' },
  { id: 43, name: 'Carol Williams', lastMessage: 'Thanks for your help!', avatar: '/avatars/carol.jpg' },
  { id: 44, name: 'David Brown', lastMessage: "I'll send you the files soon.", avatar: '/avatars/david.jpg' },
  { id: 45, name: 'Eva Davis', lastMessage: 'Looking forward to the weekend!', avatar: '/avatars/eva.jpg' },
  { id: 51, name: 'Alice Johnson', lastMessage: "Hey, how's it going?", avatar: '/avatars/alice.jpg' },
  { id: 52, name: 'Bob Smith', lastMessage: 'Can we meet tomorrow?', avatar: '/avatars/bob.jpg' },
  { id: 53, name: 'Carol Williams', lastMessage: 'Thanks for your help!', avatar: '/avatars/carol.jpg' },
  { id: 54, name: 'David Brown', lastMessage: "I'll send you the files soon.", avatar: '/avatars/david.jpg' },
  { id: 55, name: 'Eva Davis', lastMessage: 'Looking forward to the weekend!', avatar: '/avatars/eva.jpg' },
  { id: 61, name: 'Alice Johnson', lastMessage: "Hey, how's it going?", avatar: '/avatars/alice.jpg' },
  { id: 62, name: 'Bob Smith', lastMessage: 'Can we meet tomorrow?', avatar: '/avatars/bob.jpg' },
  { id: 63, name: 'Carol Williams', lastMessage: 'Thanks for your help!', avatar: '/avatars/carol.jpg' },
  { id: 64, name: 'David Brown', lastMessage: "I'll send you the files soon.", avatar: '/avatars/david.jpg' },
  { id: 65, name: 'Eva Davis', lastMessage: 'Looking forward to the weekend!', avatar: '/avatars/eva.jpg' },
]

const ChatList = ({ currentChat, setCurrentChat }) => {
  const [searchTerm, setSearchTerm] = useState('')

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
      <ScrollArea className='flex flex-col'>
        {chats
          .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((chat) => (
            <Button
              variant={currentChat == chat.id ? 'secondary' : 'outline'}
              className={cn('my-2 flex h-[unset] w-full flex-row gap-3 p-3 first:mt-0 last:mb-0')}
              key={chat.id}
              onClick={() => setCurrentChat(chat.id)}
            >
              <Avatar>
                <AvatarImage
                  src={chat.avatar}
                  alt={chat.name}
                />
                <AvatarFallback>
                  {chat.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='flex-grow text-left'>
                <p className='font-medium leading-none'>{chat.name}</p>
                <p className='text-sm text-muted-foreground'>{chat.lastMessage}</p>
              </div>
            </Button>
          ))}
      </ScrollArea>
    </div>
  )
}

export default ChatList
