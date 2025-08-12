
'use client';

import { DDIcon } from '@/components/icons';
import {
  ArrowRight,
  BookOpen,
  Bot,
  Library,
  Swords,
  Trophy,
  Zap,
} from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

const featureCards = [
  {
    icon: Library,
    text: 'আর্কাইভ',
    color: 'bg-yellow-400/20 text-yellow-400',
    href: '/dashboard/question-bank',
  },
  {
    icon: Zap,
    text: 'দ্রুত প্র্যাকটিস',
    color: 'bg-blue-400/20 text-blue-400',
    href: '/dashboard/practice-exam',
  },
  {
    icon: Swords,
    text: 'মক পরীক্ষা',
    color: 'bg-pink-400/20 text-pink-400',
    href: '/dashboard/mock-exam',
  },
  {
    icon: BookOpen,
    text: 'রুটিন',
    color: 'bg-red-400/20 text-red-400',
    href: '#',
  },
  { icon: Bot, text: 'চর্চা AI', color: 'bg-purple-400/20 text-purple-400', href: '/dashboard/chorcha-ai' },
  {
    icon: Trophy,
    text: 'লিডারবোর্ড',
    color: 'bg-green-400/20 text-green-400',
    href: '/dashboard/leaderboard',
  },
];

const leaderboardData = [
  {
    rank: 1084,
    xp: 43,
    name: 'MD Mustakim Ali Raju',
    avatar: 'https://placehold.co/40x40/c084fc/000000.png',
    fallback: 'MR',
  },
  {
    rank: 1085,
    xp: 43,
    name: 'Sysmad BCF-19 (YOU)',
    avatar: 'https://placehold.co/40x40/ffffff/000000.png',
    fallback: 'SB',
    isCurrentUser: true,
  },
  {
    rank: 1086,
    xp: 42.8,
    name: 'Arpita Sarker',
    avatar: 'https://placehold.co/40x40/d2b48c/000000.png',
    fallback: 'AS',
  },
];

const progressData = [
  { subject: 'পদার্থবিজ্ঞান', percentage: 0 },
  { subject: 'রসায়ন', percentage: 0 },
  { subject: 'উচ্চতর গণিত', percentage: 0 },
  { subject: 'জীববিজ্ঞান', percentage: 0 },
  { subject: 'বাংলা', percentage: 0 },
  { subject: 'English', percentage: 0 },
  { subject: 'সাধারণ জ্ঞান', percentage: 0 },
];

export default function DashboardPage() {
  return (
    <div className="bg-background min-h-screen">
      <header className="p-6 flex justify-between items-center md:hidden">
        <h1 className="text-2xl font-bold font-body">ড্যাশবোর্ড</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-card p-1 rounded-full">
            <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
              <DDIcon className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold pr-2">৩</span>
          </div>
        </div>
      </header>
      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {featureCards.map((card, index) => (
            <Link href={card.href} key={index}>
              <div
                className="bg-card p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:bg-primary/10 transition-colors cursor-pointer h-full"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${card.color}`}
                >
                  <card.icon className="w-8 h-8" />
                </div>
                <p className="font-semibold font-body text-center">{card.text}</p>
              </div>
            </Link>
          ))}
        </div>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="font-body">লিডারবোর্ড</CardTitle>
                <CardDescription className="font-body">আয়রন লীগ</CardDescription>
              </div>
              <Link href="/dashboard/leaderboard">
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboardData.map((item) => (
                <div
                  key={item.rank}
                  className={`flex items-center p-2 rounded-lg ${
                    item.isCurrentUser ? 'bg-secondary' : ''
                  }`}
                >
                  <p className="text-lg font-bold w-12 text-center text-muted-foreground">{item.rank}</p>
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback>{item.fallback}</AvatarFallback>
                  </Avatar>
                  <p
                    className={`flex-1 font-semibold font-body ${
                      item.isCurrentUser ? 'text-primary' : ''
                    }`}
                  >
                    {item.name}
                  </p>
                  <div className="text-right">
                    <p className="font-semibold">{item.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-body">প্রোগ্রেস রিপোর্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progressData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium font-body">{item.subject}</p>
                    <p className="text-sm font-medium text-primary">
                      {item.percentage}%
                    </p>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
