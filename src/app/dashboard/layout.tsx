
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {
  Archive,
  Bell,
  ClipboardList,
  Crown,
  History,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  MoreHorizontal,
  Settings,
  Trophy,
  User,
  Users,
  Zap,
} from 'lucide-react';
import React from 'react';
import { DDIcon } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const menuItems = [
  { icon: LayoutDashboard, text: 'ড্যাশবোর্ড', href: '/dashboard' },
  { icon: ClipboardList, text: 'মক পরীক্ষা', href: '/dashboard/mock-exam' },
  { icon: Zap, text: 'দ্রুত প্র্যাকটিস', href: '/dashboard/practice-exam' },
  { icon: Users, text: 'চর্চা কমিউনিটি', href: '/dashboard/feed' },
  { icon: Archive, text: 'আর্কাইভ', href: '/dashboard/question-bank' },
  { icon: History, text: 'হিস্ট্রি', href: '/dashboard/history' },
  { icon: Trophy, text: 'লিডারবোর্ড', href: '/dashboard/leaderboard' },
  { icon: User, text: 'প্রোফাইল', href: '/dashboard/profile' },
  { icon: Settings, text: 'সেটিংস', href: '/dashboard/settings' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // In a real app, you'd clear auth tokens here
    router.push('/');
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2">
            <DDIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold group-data-[collapsible=icon]:hidden">
              চর্চা
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    className="gap-4 font-body"
                    tooltip={item.text}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.text}
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <div className="mt-auto p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="https://placehold.co/40x40.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>SB</AvatarFallback>
                </Avatar>
                <div className="flex-1 group-data-[collapsible=icon]:hidden">
                  <p className="text-sm font-semibold">Sysmad BCF-19</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Sysmad BCF-19
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    test@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
