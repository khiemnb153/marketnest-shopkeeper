import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ThemeToggle } from './theme-toggle'
import { Fragment } from 'react'

const AppHeader = ({ title, routeTree }) => {
  return (
    <header className='sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex w-full flex-row justify-between gap-2 px-4'>
        <div className='flex items-center gap-2'>
          <SidebarTrigger className='-ml-1' />
          <Separator
            orientation='vertical'
            className='mr-2 h-4'
          />
          <Breadcrumb>
            <BreadcrumbList>
              {/* Small Screen */}

              {/* Bigger Screen */}
              {routeTree?.length > 0 &&
                routeTree.map((route, index) => (
                  <Fragment key={`route${index}`}>
                    <BreadcrumbItem className='hidden md:block'>
                      <BreadcrumbLink href={route.url}>{route.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='hidden md:block' />
                  </Fragment>
                ))}
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <ThemeToggle />
      </div>
    </header>
  )
}

export default AppHeader
