
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Bell,
  BookText,
  CreditCard,
  Flag,
  History,
  Info,
  Lock,
  LogOut,
  MessageSquarePlus,
  Shield,
  Trash2,
  User,
  Crown,
} from 'lucide-react';
import React from 'react';
import { SettingsLink } from '@/components/dashboard/settings-link';

const accountLinks = [
  { icon: User, text: 'ব্যক্তিগত তথ্য', color: 'bg-red-500' },
  { icon: Crown, text: 'আপগ্রেড', color: 'bg-purple-500' },
  { icon: CreditCard, text: 'সাবস্ক্রিপশন', color: 'bg-orange-500' },
];

const contentLinks = [
  { icon: Flag, text: 'রিপোর্টেড প্রশ্ন', badge: 0, color: 'bg-red-500' },
  { icon: History, text: 'হিস্ট্রি', badge: 12, color: 'bg-blue-500' },
  { icon: Bell, text: 'নোটিফিকেশন', badge: 0, color: 'bg-teal-500' },
  { icon: BookText, text: 'চর্চা ব্লগ', color: 'bg-purple-500' },
];

const infoLinks = [
  { icon: Info, text: 'আমাদের সম্পর্কে', color: 'bg-red-500' },
  { icon: Shield, text: 'নীতিমালা', color: 'bg-gray-500' },
  { icon: Lock, text: 'গোপনীয়তা নীতি', color: 'bg-green-500' },
];

const actionLinks = [
  { icon: Trash2, text: 'ডিলিট অ্যাকাউন্ট', color: 'bg-red-500' },
  { icon: LogOut, text: 'লগ আউট', color: 'bg-orange-500' },
];

export default function SettingsPage() {
  return (
    <div className="bg-background min-h-screen text-foreground p-6">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold font-body">সেটিংস</h1>
        <Switch />
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="https://placehold.co/96x96/ffffff/000000.png" alt="Sysmad BCF-19" />
                <AvatarFallback>SB</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-green-500 p-1.5 rounded-full border-2 border-background">
                <MessageSquarePlus className="h-4 w-4 text-white" />
              </div>
            </div>
            <h2 className="mt-4 text-lg font-semibold">Sysmad BCF-19</h2>
            <p className="text-sm text-muted-foreground">
              zhour1060@gmail.com
            </p>
            <Badge
              variant="destructive"
              className="mt-2 bg-red-500/20 text-red-400 border border-red-500/30"
            >
              Batch : HSC-26
            </Badge>
          </div>
          <div>
            <h3 className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2 px-4">
              Account
            </h3>
            <div className="space-y-1">
              {accountLinks.map((link) => (
                <SettingsLink key={link.text} {...link} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2 px-4">
              Content
            </h3>
            <div className="space-y-1">
              {contentLinks.map((link) => (
                 <SettingsLink key={link.text} {...link} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2 px-4">
              Info
            </h3>
            <div className="space-y-1">
              {infoLinks.map((link) => (
                 <SettingsLink key={link.text} {...link} />
              ))}
            </div>
          </div>

           <div>
            <h3 className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2 px-4">
              Actions
            </h3>
            <div className="space-y-1">
              {actionLinks.map((link) => (
                <SettingsLink key={link.text} {...link} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-card p-8 rounded-lg">
          <h2 className="text-lg font-semibold mb-6">ব্যক্তিগত তথ্য</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">নাম</label>
              <Input id="name" defaultValue="Sysmad BCF-19" className="bg-background" />
            </div>
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-muted-foreground mb-1">শিক্ষা প্রতিষ্ঠানের নাম</label>
              <Input id="institution" placeholder="তোমার শিক্ষা প্রতিষ্ঠানের নাম লিখো..." className="bg-background" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-muted-foreground mb-1">Type</label>
              <Select defaultValue="hsc-science">
                <SelectTrigger id="type" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hsc-science">HSC-Science</SelectItem>
                  <SelectItem value="hsc-arts">HSC-Arts</SelectItem>
                  <SelectItem value="hsc-commerce">HSC-Commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">Phone</label>
              <div className="relative">
                <Input id="phone" defaultValue="zhour1060@gmail.com" readOnly className="bg-background pr-10" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                   <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                   </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
                 <h2 className="text-lg font-semibold">পাসওয়ার্ড</h2>
                 <p className="text-sm text-muted-foreground mb-4">পরিবর্তন করতে না চাইলে খালি রাখো</p>
                 <div className="space-y-6">
                    <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-muted-foreground mb-1">New Password</label>
                        <Input id="new-password" type="password" className="bg-background"/>
                    </div>
                     <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-muted-foreground mb-1">Confirm New Password</label>
                        <Input id="confirm-password" type="password" className="bg-background"/>
                    </div>
                 </div>
            </div>

            <Button type="submit" className="bg-primary hover:bg-primary/90">Submit</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
