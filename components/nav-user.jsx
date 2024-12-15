'use client'

import { signOut, useSession } from 'next-auth/react'

import { Store, ChevronsUpDown, LogOut } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@components/ui/sidebar'
import { Button } from './ui/button'
import Link from 'next/link'

const getAbbreviationName = (name) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export function NavUser() {
  const { isMobile } = useSidebar()
  const { data: session } = useSession()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={session?.user.avatar}
                  alt={session?.user.displayName}
                />
                <AvatarFallback className='rounded-lg'>{getAbbreviationName(session?.user.displayName)}</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{session?.user.displayName}</span>
                <span className='truncate text-xs'>{session?.user.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={!isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={session?.user.avatar}
                    alt={session?.user.displayName}
                  />
                  <AvatarFallback className='rounded-lg'>{getAbbreviationName(session?.user.displayName)}</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{session?.user.displayName}</span>
                  <span className='truncate text-xs'>{session?.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className='cursor-pointer'
              >
                <Link href={'/profile'}>
                  <Store />
                  Hồ sơ cửa hàng
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: '/logout' })}
              className='cursor-pointer'
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
