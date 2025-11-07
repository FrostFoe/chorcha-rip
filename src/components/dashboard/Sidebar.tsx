"use client";

import { useSupabase } from "@/app/supabase-provider";
import {
  BookOpen,
  Compass,
  FilePenLine,
  LayoutGrid,
  PanelLeft,
  PanelRight,
  User,
  Coins,
  Store,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserData } from "@/providers/UserDataProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const sidebarLinks = [
  { href: "/dashboard", label: "ড্যাশবোর্ড", icon: LayoutGrid },
  { href: "/store", label: "স্টোর", icon: Store },
  { href: "/browse", label: "ব্রাউজ", icon: Compass },
  { href: "/assignments", label: "অ্যাসাইনমেন্ট", icon: FilePenLine },
  { href: "/profile", label: "প্রোফাইল", icon: User },
];

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

function SidebarComponent({ isCollapsed, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const { session } = useSupabase();
  const { bitcoinBalance, profile } = useUserData();

  const userFullName = profile?.full_name || "Guest";
  const userEmail = session?.user?.email;
  const userAvatarUrl = profile?.avatar_url;

  return (
    <aside
      className={cn(
        "hidden lg:fixed lg:inset-y-0 z-30 lg:flex lg:flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-300",
        isCollapsed ? "lg:w-sidebar-collapsed" : "lg:w-sidebar-expanded",
      )}
    >
      <div className="flex h-20 items-center justify-between px-5">
        {!isCollapsed && (
          <div className="flex items-center">
            <Link href="/dashboard">
              <Image
                className="h-8 w-auto"
                src="/logo-dark.webp"
                alt="Chorcha Logo"
                width={100}
                height={32}
              />
            </Link>
          </div>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-10 w-10 shrink-0 text-muted-foreground hover:text-foreground rounded-full transition-transform",
            isCollapsed && "mx-auto",
          )}
        >
          {isCollapsed ? (
            <PanelRight className="h-6 w-6" />
          ) : (
            <PanelLeft className="h-6 w-6" />
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 mt-6 space-y-2">
        {sidebarLinks.map((link) => {
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({
                  variant:
                    (pathname.startsWith(link.href) &&
                      link.href !== "/dashboard") ||
                    pathname === link.href
                      ? "secondary"
                      : "ghost",
                  size: "default",
                }),
                "w-full justify-start gap-x-4 px-4 py-2 h-auto text-base group",
                (pathname.startsWith(link.href) &&
                  link.href !== "/dashboard") ||
                  pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
                isCollapsed && "justify-center",
              )}
              title={isCollapsed ? link.label : undefined}
            >
              <link.icon className="h-5 w-5" />
              {!isCollapsed && <span className="truncate">{link.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div
        className={cn(
          "mt-auto px-4 py-6 border-t border-sidebar-border",
          isCollapsed && "px-2",
        )}
      >
        <div className="space-y-2">
          <div
            className={cn(
              buttonVariants({ variant: "ghost", size: "default" }),
              "w-full justify-start gap-x-4 px-4 py-2 h-auto text-base text-muted-foreground",
              isCollapsed && "justify-center",
            )}
          >
            <Coins className="h-5 w-5 text-primary" />
            {!isCollapsed && (
              <div className="flex justify-between w-full items-center">
                <span className="truncate">ব্যালেন্স</span>
                <span className="font-bold text-foreground">
                  {bitcoinBalance}
                </span>
              </div>
            )}
          </div>
          <Link
            href="/profile"
            className={cn(
              "flex items-center gap-x-3 p-2 rounded-md hover:bg-primary/5",
              isCollapsed && "justify-center",
            )}
          >
            <Avatar className="h-10 w-10 border-2 border-sidebar-border">
              <AvatarImage src={userAvatarUrl} alt={userFullName} />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="truncate space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {userFullName}
                </p>
                {userEmail && (
                  <p className="text-xs font-light text-muted-foreground">
                    {userEmail}
                  </p>
                )}
              </div>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
}

export const Sidebar = React.memo(SidebarComponent);
