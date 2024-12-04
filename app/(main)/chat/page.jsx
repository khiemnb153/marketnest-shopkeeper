'use client'

import { useState, useEffect, use } from 'react'
import { buildUrl } from '@lib/utils'
import { useRouter } from 'next/navigation'

import { Search, Plus } from 'lucide-react'

import AppWrapper from '@components/app-wrapper'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import Link from 'next/link'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@components/ui/select'

import DataBlock from '@components/data-block'
import ChatList from './chat-list'
import ChatDisplay from './chat-display'

const ChatPage = () => {
  const [currentChat, setCurrentChat] = useState()

  return (
    <AppWrapper
      title='Trò chuyện với khách hàng'
      className='flex h-[680px] flex-row gap-4'
    >
      <ChatList
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
      <ChatDisplay chatId={currentChat} />
    </AppWrapper>
  )
}

export default ChatPage
