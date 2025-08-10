
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DDIcon, SatCollegeIcon, BupIcon, MaritimeIcon, BuetIcon, RuetIcon, KuetIcon, CuetIcon, IutIcon, ButexIcon, MistIcon, MedicalIcon, DentalIcon, AfmcIcon, IbaIcon, NursingIcon, GucchoIcon, DuIcon, RuIcon, JuIcon, CuIcon, JnuIcon, AgriIcon, BcsIcon, LaptopIcon, Physics1Icon, Physics2Icon, Chemistry1Icon, Chemistry2Icon, HigherMath1Icon, HigherMath2Icon, Biology1Icon, Biology2Icon, Stats1Icon, Stats2Icon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const modelTests = [
  { title: 'মিশন \'২৪', subtitle: 'ভার্সিটি এডমিশন', bg: 'bg-blue-900/50', image: '/images/model-test-1.png' },
  { title: 'মিশন \'২৪', subtitle: 'মেডিকেল এডমিশন', bg: 'bg-cyan-900/50', image: '/images/model-test-2.png' },
  { title: 'এইচএসসি ২৫', subtitle: '৪র্থ অধ্যায় রসায়ন টেস্ট', bg: 'bg-purple-900/50', image: '/images/model-test-3.png' },
  { title: 'এডমিশন', subtitle: 'মডেল টেস্ট \'২৪', bg: 'bg-red-900/50', image: '/images/model-test-4.png' },
  { title: 'জাতীয় বিশ্ববিদ্যালয়', subtitle: 'সর্বশেষ মডেল টেস্ট', bg: 'bg-orange-900/50', image: '/images/model-test-5.png' },
];

const subjectCards = [
    { title: "বাংলা", subtitle: "১ম পত্র", icon: <span className="text-5xl font-bold">অ</span>, color: "bg-yellow-500/10 text-yellow-500" },
    { title: "বাংলা", subtitle: "২য় পত্র", icon: <span className="text-5xl font-bold">আ</span>, color: "bg-yellow-600/10 text-yellow-600" },
    { title: "ইংরেজী", subtitle: "১ম পত্র", icon: <span className="text-5xl font-bold">A</span>, color: "bg-red-500/10 text-red-500" },
    { title: "ইংরেজী", subtitle: "২য় পত্র", icon: <span className="text-5xl font-bold">a</span>, color: "bg-red-600/10 text-red-600" },
    { title: "তথ্য ও যোগাযোগ প্রযুক্তি", icon: <LaptopIcon className="w-12 h-12" />, color: "bg-indigo-500/10 text-indigo-500" },
    { title: "পদার্থবিজ্ঞান", subtitle: "১ম পত্র", icon: <Physics1Icon className="w-12 h-12" />, color: "bg-blue-500/10 text-blue-500" },
    { title: "পদার্থবিজ্ঞান", subtitle: "২য় পত্র", icon: <Physics2Icon className="w-12 h-12" />, color: "bg-blue-600/10 text-blue-600" },
    { title: "রসায়ন", subtitle: "১ম পত্র", icon: <Chemistry1Icon className="w-12 h-12" />, color: "bg-purple-500/10 text-purple-500" },
    { title: "রসায়ন", subtitle: "২য় পত্র", icon: <Chemistry2Icon className="w-12 h-12" />, color: "bg-purple-600/10 text-purple-600" },
    { title: "উচ্চতর গনিত", subtitle: "১ম পত্র", icon: <HigherMath1Icon className="w-12 h-12" />, color: "bg-orange-500/10 text-orange-500" },
    { title: "উচ্চতর গনিত", subtitle: "২য় পত্র", icon: <HigherMath2Icon className="w-12 h-12" />, color: "bg-orange-600/10 text-orange-600" },
    { title: "জীববিজ্ঞান", subtitle: "১ম পত্র", icon: <Biology1Icon className="w-12 h-12" />, color: "bg-green-500/10 text-green-500" },
    { title: "জীববিজ্ঞান", subtitle: "২য় পত্র", icon: <Biology2Icon className="w-12 h-12" />, color: "bg-green-600/10 text-green-600" },
    { title: "পরিসংখ্যান", subtitle: "১ম পত্র", icon: <Stats1Icon className="w-12 h-12" />, color: "bg-pink-500/10 text-pink-500" },
    { title: "পরিসংখ্যান", subtitle: "২য় পত্র", icon: <Stats2Icon className="w-12 h-12" />, color: "bg-pink-600/10 text-pink-600" },
];


const institutionCards = [
  { name: 'সাত কলেজ', icon: <SatCollegeIcon />, color: 'bg-pink-400/20' },
  { name: 'বিইউপি', icon: <BupIcon />, color: 'bg-yellow-400/20' },
  { name: 'মেরিটাইম', icon: <MaritimeIcon />, color: 'bg-gray-400/20' },
  { name: 'বুয়েট', icon: <BuetIcon />, color: 'bg-red-400/20' },
  { name: 'গুচ্ছ ইঞ্জিঃ', icon: <GucchoIcon />, color: 'bg-blue-400/20' },
  { name: 'রুয়েট', icon: <RuetIcon />, color: 'bg-yellow-500/20' },
  { name: 'কুয়েট', icon: <KuetIcon />, color: 'bg-green-400/20' },
  { name: 'চুয়েট', icon: <CuetIcon />, color: 'bg-teal-400/20' },
  { name: 'আইইউটি', icon: <IutIcon />, color: 'bg-rose-400/20' },
  { name: 'বুটেক্স', icon: <ButexIcon />, color: 'bg-pink-500/20' },
  { name: 'এমআইএসটি', icon: <MistIcon />, color: 'bg-purple-400/20' },
  { name: 'মেডিকেল', icon: <MedicalIcon />, color: 'bg-green-500/20' },
  { name: 'ডেন্টাল', icon: <DentalIcon />, color: 'bg-orange-400/20' },
  { name: 'এএফএমসি', icon: <AfmcIcon />, color: 'bg-lime-400/20' },
  { name: 'আইবিএ', icon: <IbaIcon />, color: 'bg-indigo-400/20' },
  { name: 'নার্সিং', icon: <NursingIcon />, color: 'bg-amber-400/20' },
  { name: 'গুচ্ছ', icon: <GucchoIcon />, color: 'bg-fuchsia-400/20' },
  { name: 'ঢাবি', icon: <DuIcon />, color: 'bg-sky-400/20' },
  { name: 'রাবি', icon: <RuIcon />, color: 'bg-emerald-400/20' },
  { name: 'জাবি', icon: <JuIcon />, color: 'bg-green-600/20' },
  { name: 'চবি', icon: <CuIcon />, color: 'bg-cyan-400/20' },
  { name: 'জবি', icon: <JnuIcon />, color: 'bg-lime-500/20' },
  { name: 'কৃষি গুচ্ছ', icon: <AgriIcon />, color: 'bg-yellow-600/20' },
  { name: 'বিসিএস', icon: <BcsIcon />, color: 'bg-rose-500/20' },
];

export default function QuestionBankPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <DDIcon className="h-8 w-8 text-primary" />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="খুঁজুন..." className="bg-card border-border pl-9" />
          </div>
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">আর্কাইভ</h1>
        <div className="flex items-center gap-2 mb-10">
          <Button variant="secondary" size="sm">همه দেখুন</Button>
          <Button variant="outline" size="sm">বিষয় ভিত্তিক</Button>
          <Button variant="outline" size="sm">প্রতিষ্ঠান ভিত্তিক</Button>
        </div>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">মডেল টেস্ট</h2>
            <p className="text-sm text-muted-foreground">সর্বশেষ মডেলসমূহ দেখুন</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {modelTests.map((test, index) => (
              <div key={index} className={`relative rounded-xl overflow-hidden aspect-square flex flex-col justify-end p-4 ${test.bg}`}>
                <Image src="https://placehold.co/200x200.png" alt={test.title} layout="fill" objectFit="cover" className="opacity-20" />
                <div className="relative z-10 text-white">
                  <Badge variant="destructive" className="absolute top-[-100px] right-0 bg-red-600/80 text-white text-xs">Live</Badge>
                  <h3 className="font-bold text-lg">{test.title}</h3>
                  <p className="text-sm">{test.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">বিষয় ভিত্তিক</h2>
            <p className="text-sm text-muted-foreground">সকল বিষয়ের প্রশ্নব্যাংক</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {subjectCards.map((card, index) => (
              <div key={index} className={`rounded-xl aspect-square flex flex-col items-center justify-center p-4 text-center ${card.color}`}>
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="font-bold">{card.title}</h3>
                {card.subtitle && <p className="text-sm">{card.subtitle}</p>}
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">প্রতিষ্ঠান ভিত্তিক</h2>
            <p className="text-sm text-muted-foreground">সকল ভর্তি পরীক্ষার প্রশ্ন</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {institutionCards.map((card, index) => (
              <div key={index} className={`rounded-xl aspect-square flex flex-col items-center justify-center gap-2 p-2 text-center ${card.color}`}>
                <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-sm text-foreground">{card.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
