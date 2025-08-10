
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Archive,
  Bell,
  ChevronRight,
  ClipboardList,
  Contact,
  CreditCard,
  History,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  Trophy,
  User,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import React, { Children } from 'react';
import { Button } from '@/components/ui/button';
import { DDIcon } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuItems = [
  { icon: LayoutDashboard, text: 'ড্যাশবোর্ড', active: true },
  { icon: ClipboardList, text: 'মক পরীক্ষা' },
  { icon: Zap, text: 'দ্রুত প্র্যাকটিস' },
  { icon: Users, text: 'চর্চা কমিউনিটি' },
  { icon: Archive, text: 'আর্কাইভ' },
  { icon: History, text: 'হিস্ট্রি' },
  { icon: Trophy, text: 'লিডারবোর্ড' },
  { icon: User, text: 'প্রোফাইল' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <DDIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">চর্চা</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  isActive={item.active}
                  className="gap-4 font-body"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.text}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <div className="mt-auto p-4">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://placehold.co/40x40.png" />
              <AvatarFallback>SB</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-semibold">Sysmad BCF-19</p>
            </div>
          </div>
        </div>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
