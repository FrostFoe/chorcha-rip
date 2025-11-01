"use client"

import { DashboardClient } from "@/components/dashboard/DashboardClient"
import { MobileNav } from "@/components/dashboard/MobileNav"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import * as React from "react"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const isMobile = useIsMobile()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)

  const toggleSidebar = React.useCallback(
    () => setIsSidebarCollapsed((prev) => !prev),
    []
  )

  return (
    <div className="min-h-screen bg-background">
      {isMobile ? (
        <MobileNav />
      ) : (
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
      )}
      <main
        className={cn(
          "pb-mobile-nav lg:pb-0 transition-[margin-left] duration-300",
          isMobile
            ? "pt-16"
            : isSidebarCollapsed
              ? "lg:ml-sidebar-collapsed"
              : "lg:ml-sidebar-expanded"
        )}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <DashboardClient />
        </div>
      </main>
    </div>
  )
}
