"use client";

import {
  Compass,
  FilePenLine,
  LayoutGrid,
  Store,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";

const bottomNavLinks = [
  { href: "/dashboard", label: "ড্যাশবোর্ড", icon: LayoutGrid },
  { href: "/store", label: "স্টোর", icon: Store },
  { href: "/browse", label: "ব্রাউজ", icon: Compass },
  { href: "/assignments", label: "অ্যাসাইনমেন্ট", icon: FilePenLine },
  { href: "/profile", label: "প্রোফাইল", icon: User },
];

function MobileNavComponent() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full border-t bg-background lg:hidden">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-5 font-medium">
        {bottomNavLinks.map((link) => {
          const isActive =
            (link.href !== "/" && pathname.startsWith(link.href)) ||
            pathname === link.href;
          return (
            <Link
              href={link.href}
              key={link.href}
              className={cn(
                "group inline-flex flex-col items-center justify-center px-2 text-center",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <link.icon className="mb-1 h-6 w-6" />
              <span className="text-xs">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export const MobileNav = React.memo(MobileNavComponent);
