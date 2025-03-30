"use client"

import * as React from "react"
import Image from "next/image"
import {
  BarChartIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "bombardino crocodilo",
    email: "triemas.putra@gmail.com",
    avatar: "https://i1.sndcdn.com/artworks-ACVdFsOSQyupQv3b-UkcUtA-t500x500.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Users",
      url: "/users",
      icon: UsersIcon,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChartIcon,
    },
    {
      title: "Data",
      url: "/data",
      icon: FolderIcon,
    },
    {
      title: "Roles & Permissions",
      url: "/roles-permissions",
      icon: SettingsIcon,
    },
    {
      title: "Logs",
      url: "/logs",
      icon: ClipboardListIcon,
    },
  ],
  navClouds: [
    {
      title: "Uploads",
      icon: FileIcon,
      url: "#",
      items: [
        {
          title: "Active Uploads",
          url: "#",
        },
        {
          title: "Archived Uploads",
          url: "#",
        },
      ],
    },
    {
      title: "Backups",
      icon: DatabaseIcon,
      url: "#",
      items: [
        {
          title: "Recent Backups",
          url: "#",
        },
        {
          title: "Backup History",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Profile",
      url: "#",
      icon: UsersIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileIcon,
    },
  ],
}

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold">U-Reserve</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            ...data.user,
            avatar: (
              <Image
                src={data.user.avatar}
                alt={data.user.name}
                width={40}
                height={40}
                loader={({ src }) => src}
                unoptimized
                onError={(e) => {
                  e.currentTarget.src = "/fallback-avatar.png"
                }}
                placeholder="blur"
                blurDataURL="/placeholder.png"
              />
            ),
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}