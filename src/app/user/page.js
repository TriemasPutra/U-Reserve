'use client'

import React, { useState } from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ComingSoon } from "@/components/coming-soon"
import { Floor2, Floor3 } from '@/components/floor'

const tab = [
  { tab: 'Kampus 1', href: '#Kampus1'},
  { tab: 'Kampus 2', href: '#Kampus2'},
]

const items = {
  "Kampus 1": [Floor2, Floor3],
  "Kampus 2": [ComingSoon],
}

export default function Page() {
  const [activeTab, setActiveTab] = useState("Kampus 1")

  function changeItems(e) {
    setActiveTab(e.target.id)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 ...">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    U-Reserve
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Reserve Room</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-row gap-4 p-4 pt-0 h-min">
          {tab.map((item) => (
            <a
              onClick={changeItems}
              id={item.tab}
              key={item.tab}
              href={item.href}
              className="inline-block w-1/2 text-center text-sm/6 font-semibold text-gray-900 h-max"
            >
              {item.tab}
            </a>
          ))}
        </div>
        <div id="content">
          {items[activeTab]?.map((Component, index) => (
            <Component key={index} />
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}