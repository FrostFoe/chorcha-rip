
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DDIcon } from '@/components/icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  Trophy,
  Zap,
  ClipboardList,
  Flame,
  MessageCircle,
  Shield,
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Crown,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const weeklyPointsData = [
  { day: 'S', points: 50 },
  { day: 'M', points: 0 },
  { day: 'T', points: 0 },
  { day: 'W', points: 0 },
  { day: 'T', points: 0 },
  { day: 'F', points: 0 },
  { day: 'S', points: 0 },
];

const progressData = [
    { subject: 'পদার্থবিজ্ঞান', percentage: 0 },
    { subject: 'রসায়ন', percentage: 0 },
    { subject: 'উচ্চতর গণিত', percentage: 0 },
    { subject: 'জীববিজ্ঞান', percentage: 0 },
    { subject: 'বাংলা', percentage: 0 },
    { subject: 'English', percentage: 0 },
    { subject: 'তথ্য ও যোগাযোগ প্রযুক্তি', percentage: 0 },
    { subject: 'পরিসংখ্যান', percentage: 0 },
    { subject: 'সাধারণ জ্ঞান', percentage: 0 },
];

export default function ProfilePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  useEffect(() => {
    // Set the date only on the client side to avoid hydration mismatch
    setSelectedDate(new Date(2025, 7, 10));
  }, [])

  return (
    <div className="bg-background min-h-screen text-foreground p-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold font-body">প্রোফাইল</h1>
        <div className="flex items-center gap-2 bg-card p-1 rounded-full">
          <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
            <DDIcon className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold pr-2">৩</span>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card p-6 rounded-lg">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-background">
                  <AvatarImage src="https://placehold.co/96x96.png" alt="Sysmad BCF-19" />
                  <AvatarFallback>SB</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-1 rounded-full">
                  <Crown className="h-4 w-4 text-white" fill="white" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold">Sysmad BCF-19</h2>
                <Badge variant="secondary" className="mt-1 bg-red-500/20 text-red-400 border border-red-500/30">
                  Batch : HSC-26
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-center">
                <div className="p-2">
                    <Trophy className="h-6 w-6 mx-auto text-purple-400 mb-1"/>
                    <p className="font-bold text-lg">১০৮৭</p>
                    <p className="text-xs text-muted-foreground">বর্তমান র‍্যাংক</p>
                </div>
                 <div className="p-2">
                    <Zap className="h-6 w-6 mx-auto text-yellow-400 mb-1"/>
                    <p className="font-bold text-lg">৪৩</p>
                    <p className="text-xs text-muted-foreground">XP</p>
                </div>
                 <div className="p-2">
                    <ClipboardList className="h-6 w-6 mx-auto text-green-400 mb-1"/>
                    <p className="font-bold text-lg">8</p>
                    <p className="text-xs text-muted-foreground">মোট পরীক্ষা</p>
                </div>
                 <div className="p-2">
                    <Flame className="h-6 w-6 mx-auto text-orange-400 mb-1"/>
                    <p className="font-bold text-lg">১</p>
                    <p className="text-xs text-muted-foreground">দিনের স্ট্রিক</p>
                </div>
                 <div className="p-2">
                    <MessageCircle className="h-6 w-6 mx-auto text-blue-400 mb-1"/>
                    <p className="font-bold text-lg">০</p>
                    <p className="text-xs text-muted-foreground">ডাউট সমাধান</p>
                </div>
                <div className="p-2">
                    <Shield className="h-6 w-6 mx-auto text-gray-400 mb-1"/>
                    <p className="font-bold text-lg">আয়রন</p>
                    <p className="text-xs text-muted-foreground">লীগ</p>
                </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg flex items-center justify-center min-h-[150px]">
            <div className="text-center text-muted-foreground">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2"/>
                <p>এখনো কোনো ব্যাজ অর্জন করা হয়নি</p>
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">সাপ্তাহিক পয়েন্ট</h3>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyPointsData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} dy={10} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis hide={true} domain={[0, 60]} />
                  <Bar dataKey="points" barSize={10} radius={[10, 10, 10, 10]}>
                    {weeklyPointsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.points > 0 ? 'hsl(var(--primary))' : 'hsl(var(--muted))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">Aug 10 - Aug 16, 2025</p>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-card p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-center">প্রোগ্রেস রিপোর্ট</h3>
                <div className="space-y-3">
                    {progressData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted/30 p-3 rounded-md">
                            <span className="font-medium text-sm">{item.subject}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-primary">{item.percentage}%</span>
                                <ChevronDown className="h-4 w-4 text-muted-foreground"/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          <div className="bg-card p-4 rounded-lg">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
              classNames={{
                head_cell: 'w-full text-muted-foreground text-xs',
                cell: 'w-full',
                day: 'w-full h-10',
                day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
              }}
              components={{
                Caption: ({ ...props }) => (
                    <div className="flex justify-between items-center px-2 py-1 mb-2 relative">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4"/></Button>
                        <h3 className="font-semibold text-center">স্ট্রিক August 2025</h3>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4"/></Button>
                    </div>
                ),
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
