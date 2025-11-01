"use client";

import {
  BookOpen,
  Compass,
  FilePenLine,
  LayoutGrid,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/dashboard", label: "ড্যাশবোর্ড", icon: LayoutGrid },
  { href: "/my-courses", label: "আমার কোর্স", icon: BookOpen },
  { href: "/browse", label: "ব্রাউজ", icon: Compass },
  { href: "/assignments", label: "অ্যাসাইনমেন্ট", icon: FilePenLine },
  { href: "/leaderboard", label: "লিডারবোর্ড", icon: Trophy },
];

function MobileNavComponent() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full border-t bg-sidebar lg:hidden">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-5 font-medium">
        {sidebarLinks.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={cn(
              "group inline-flex flex-col items-center justify-center px-4",
              (pathname.startsWith(link.href) && link.href !== "/dashboard") ||
                pathname === link.href
                ? "text-sidebar-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <link.icon className="mb-1 h-6 w-6" />
            <span className="text-xs">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export const MobileNav = React.memo(MobileNavComponent);
