"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const adminRoutes = [
  {
    label: "ড্যাশবোর্ড",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "কোর্স",
    icon: BookOpen,
    href: "/admin/courses",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      notFound();
    }
  }, []);


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed h-10 w-10"
            >
              {isSidebarOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
            <h1 className="text-base sm:text-lg font-bold">অ্যাডমিন প্যানেল</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-xs sm:text-sm"
          >
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">লগআউট</span>
            </Link>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-64 border-r bg-background/50 px-4 py-6 transition-all duration-300 overflow-y-auto sm:relative sm:left-auto sm:top-0 sm:z-20 sm:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <nav className="space-y-2">
            {adminRoutes.map((route) => {
              const Icon = route.icon;
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                  onClick={() => {
                    if (window.innerWidth < 640) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {route.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full flex-1">
          <div className="p-3 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
