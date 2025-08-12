
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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Bot,
  Crown,
  History,
  LayoutGrid,
  Library,
  LogOut,
  Settings,
  Swords,
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
  { icon: LayoutGrid, text: 'ড্যাশবোর্ড', href: '/dashboard' },
  { icon: Bot, text: 'চর্চা AI', href: '/dashboard/chorcha-ai' },
  { icon: Swords, text: 'মক পরীক্ষা', href: '/dashboard/mock-exam' },
  { icon: Zap, text: 'দ্রুত প্র্যাকটিস', href: '/dashboard/practice-exam' },
  { icon: Users, text: 'চর্চা কমিউনিটি', href: '/dashboard/feed' },
  { icon: Library, text: 'আর্কাইভ', href: '/dashboard/question-bank' },
  { icon: History, text: 'হিস্ট্রি', href: '/dashboard/history' },
  { icon: Trophy, text: 'লিডারবোর্ড', href: '/dashboard/leaderboard' },
];

function MobileHeader() {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-card px-4 md:hidden">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="h-8 w-8" />
        <Link href="/" className="flex items-center gap-2">
          <DDIcon className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">চর্চা</span>
        </Link>
      </div>
       <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="https://placehold.co/40x40.png" />
                <AvatarFallback>SB</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            align="end"
            forceMount
          >
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
             <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>প্রোফাইল</span>
                </Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>সেটিংস</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>লগ আউট</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </header>
  );
}

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

  const mainMenuItems = menuItems.slice(0, 8);
  const bottomMenuItems = menuItems.slice(8);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <Link
              href="/"
              className="flex items-center gap-2 group-data-[collapsed=true]:hidden"
            >
              <DDIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">চর্চা</span>
            </Link>
             <div className="flex-1" />
            <SidebarTrigger className="ml-auto" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {mainMenuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <Link href={item.href} className="w-full">
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      className="gap-3"
                      tooltip={item.text}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="group-data-[collapsed=true]:hidden">
                        {item.text}
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <div className="mt-auto p-2">
            <SidebarMenu>
               {bottomMenuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <Link href={item.href} className="w-full">
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      className="gap-3"
                      tooltip={item.text}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="group-data-[collapsed=true]:hidden">
                        {item.text}
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer group-data-[collapsed]:justify-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="https://placehold.co/40x40.png"
                      alt="User avatar"
                    />
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 group-data-[collapsed=true]:hidden">
                    <p className="text-sm font-semibold">Sysmad BCF-19</p>
                    <p className="text-xs text-muted-foreground">Free Account</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 mb-2 ml-2"
                align="start"
                side="right"
                forceMount
              >
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
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>প্রোফাইল</span>
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>সেটিংস</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>লগ আউট</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <MobileHeader />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
