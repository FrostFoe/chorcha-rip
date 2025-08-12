
"use client"

import * as React from "react"
import { AnimatePresence, motion, type Transition } from "framer-motion"
import { PanelLeft } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// --- Context ---
type SidebarContextValue = {
  isCollapsed: boolean
  isMobile: boolean
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// --- Provider ---
const SIDEBAR_COOKIE_NAME = "sidebar_collapsed"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isCollapsed, setCollapsed] = React.useState(true)
  const [isMounted, setIsMounted] = React.useState(false);


  // Load initial state from cookie
  React.useEffect(() => {
    setIsMounted(true);
    if (isMobile) {
      setCollapsed(true)
      return
    }
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
      ?.split("=")[1]

    if (cookieValue) {
      setCollapsed(cookieValue === "true")
    } else {
        setCollapsed(false) // Default to open on desktop
    }
  }, [isMobile])
  
  // Update cookie on change
  const toggle = React.useCallback(() => {
    setCollapsed((prev) => {
      const newState = !prev
      if (!isMobile) {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${newState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      }
      return newState
    })
  }, [isMobile])
  
  // Collapse on mobile
  React.useEffect(() => {
      if (isMobile) {
        setCollapsed(true)
      }
  }, [isMobile])

  if (!isMounted) {
    return null; // Don't render on the server to avoid hydration mismatch
  }


  return (
    <SidebarContext.Provider value={{ isCollapsed, isMobile, toggle }}>
        <TooltipProvider delayDuration={0}>
         {children}
        </TooltipProvider>
    </SidebarContext.Provider>
  )
}

// --- Layout Components ---

const TRANSITION: Transition = {
  ease: "easeInOut",
  duration: 0.2,
}

export function Sidebar({ children, className }: { children: React.ReactNode; className?: string }) {
  const { isCollapsed, isMobile, toggle } = useSidebar()

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        data-collapsed={isCollapsed}
        className={cn(
          "hidden md:flex flex-col border-r bg-card text-card-foreground group",
          className
        )}
        initial={false}
        animate={{ width: isCollapsed ? "3.75rem" : "16rem" }}
        transition={TRANSITION}
      >
        {children}
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {!isCollapsed && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={TRANSITION}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={toggle}
            />
            <motion.aside
              className={cn("fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r bg-card text-card-foreground", className)}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={TRANSITION}
            >
              {children}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  const { isCollapsed } = useSidebar()
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn("flex h-14 items-center border-b p-2", className)}
    >
      {children}
    </div>
  )
}

export function SidebarContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex-1 overflow-y-auto overflow-x-hidden", className)}>
      {children}
    </div>
  )
}

export function SidebarMenu({ children, className }: { children: React.ReactNode; className?: string }) {
    return <ul className={cn("flex flex-col gap-1 p-2", className)}>{children}</ul>
}

export function SidebarMenuItem({ children, className }: { children: React.ReactNode; className?: string }) {
    return <li className={cn("relative", className)}>{children}</li>
}

export function SidebarMenuButton({
    children,
    className,
    isActive,
    tooltip,
}: {
    children: React.ReactNode
    className?: string
    isActive?: boolean
    tooltip?: string
}) {
    const { isCollapsed } = useSidebar()

    const buttonContent = (
        <Button
          variant={isActive ? 'secondary' : 'ghost'}
          className={cn('h-10 w-full justify-start', className)}
          aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </Button>
    )

    if (isCollapsed && tooltip) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                <TooltipContent side="right" align="center">
                    {tooltip}
                </TooltipContent>
            </Tooltip>
        )
    }

    return buttonContent
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { toggle, isMobile } = useSidebar()

  if (isMobile) {
    return (
       <Button
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8", className)}
        onClick={toggle}
        aria-label="Toggle sidebar"
      >
        <PanelLeft />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(className)}
      onClick={toggle}
      aria-label="Toggle sidebar"
    >
      <PanelLeft />
    </Button>
  )
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
        </main>
    )
}
