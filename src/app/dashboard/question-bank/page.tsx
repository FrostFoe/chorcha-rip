
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  AgriIcon,
  BcsIcon,
  Biology1Icon,
  Biology2Icon,
  BupIcon,
  BuetIcon,
  ButexIcon,
  Chemistry1Icon,
  Chemistry2Icon,
  CuetIcon,
  CuIcon,
  DentalIcon,
  DDIcon,
  DuIcon,
  GucchoIcon,
  HigherMath1Icon,
  HigherMath2Icon,
  IbaIcon,
  IutIcon,
  JnuIcon,
  JuIcon,
  KuetIcon,
  LaptopIcon,
  MaritimeIcon,
  MedicalIcon,
  MistIcon,
  NursingIcon,
  Physics1Icon,
  Physics2Icon,
  RuetIcon,
  RuIcon,
  SatCollegeIcon,
  Stats1Icon,
  Stats2Icon,
  AfmcIcon
} from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const subjectCards = [
  {
    title: 'বাংলা',
    subtitle: '১ম পত্র',
    icon: <span className="text-8xl font-bold opacity-20">অ</span>,
    color: 'from-[#C4811C] to-[#D7A22A]',
  },
  {
    title: 'বাংলা',
    subtitle: '২য় পত্র',
    icon: <span className="text-8xl font-bold opacity-20">আ</span>,
    color: 'from-[#C4811C] to-[#D7A22A]',
  },
  {
    title: 'ইংরেজী',
    subtitle: '১ম পত্র',
    icon: <span className="text-8xl font-bold opacity-20">A</span>,
    color: 'from-[#E5252A] to-[#E5252A]',
  },
  {
    title: 'ইংরেজী',
    subtitle: '২য় পত্র',
    icon: <span className="text-8xl font-bold opacity-20">a</span>,
    color: 'from-[#E5252A] to-[#E5252A]',
  },
  {
    title: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    icon: <LaptopIcon className="w-16 h-16 opacity-50" />,
    color: 'from-[#2F46C4] to-[#4965E4]',
  },
  {
    title: 'পদার্থবিজ্ঞান',
    subtitle: '১ম পত্র',
    icon: <Physics1Icon className="w-16 h-16 opacity-50" />,
    color: 'from-[#1E82C8] to-[#2E99E6]',
  },
  {
    title: 'পদার্থবিজ্ঞান',
    subtitle: '২য় পত্র',
    icon: <Physics2Icon className="w-16 h-16 opacity-50" />,
    color: 'from-[#1E82C8] to-[#2E99E6]',
  },
  {
    title: 'রসায়ন',
    subtitle: '১ম পত্র',
    icon: <Chemistry1Icon className="w-16 h-16 opacity-50" />,
    color: 'from-[#8C1EC8] to-[#A32EE6]',
  },
  {
    title: 'রসায়ন',
    subtitle: '২য় পত্র',
    icon: <Chemistry2Icon className="w-16 h-16 opacity-50" />,
    color: 'from-[#8C1EC8] to-[#A32EE6]',
  },
  {
    title: 'উচ্চতর গনিত',
    subtitle: '১ম পত্র',
    icon: <HigherMath1Icon className="w-16 h-16 opacity-50" />,
    color: 'from-[#C8671E] to-[#E6812E]',
  },
  {
    title: 'উচ্চতর গনিত',
    subtitle: '২য় পত্র',
    icon: <HigherMath2Icon className="w-16 h-16 opacity-50" />,
    color: 'from-[#C8671E] to-[#E6812E]',
  },
  {
    title: 'জীববিজ্ঞান',
    subtitle: '১ম পত্র',
    icon: <Biology1Icon className="w-16 h-16 opacity-50" />,
    color: 'from-[#3AC81E] to-[#43E62E]',
  },
  {
    title: 'জীববিজ্ঞান',
    subtitle: '২য় পত্র',
    icon: <Biology2Icon className="w-16 h-16 opacity-50" />,
    color: 'from-[#3AC81E] to-[#43E62E]',
  },
  {
    title: 'পরিসংখ্যান',
    subtitle: '১ম পত্র',
    icon: <Stats1Icon className="w-16 h-16 opacity-50" />,
    color: 'from-[#C81E8A] to-[#E62E9F]',
  },
  {
    title: 'পরিসংখ্যান',
    subtitle: '২য় পত্র',
    icon: <Stats2Icon className="w-16 h-16 opacity-50" />,
    color: 'from-[#C81E8A] to-[#E62E9F]',
  },
];

const institutionCards = [
    { name: 'বিইউপি', icon: <BupIcon />, color: '#B3A533' },
    { name: 'মেরিটাইম', icon: <MaritimeIcon />, color: '#5597B3' },
    { name: 'বুয়েট', icon: <BuetIcon />, color: '#B32A2F' },
    { name: 'গুচ্ছ ইঞ্জিঃ', icon: <GucchoIcon />, color: '#277AB3' },
    { name: 'রুয়েট', icon: <RuetIcon />, color: '#B39127' },
    { name: 'কুয়েট', icon: <KuetIcon />, color: '#3FB344' },
    { name: 'চুয়েট', icon: <CuetIcon />, color: '#27ABB3' },
    { name: 'আইইউটি', icon: <IutIcon />, color: '#B3275B' },
    { name: 'বুটেক্স', icon: <ButexIcon />, color: '#B3275B' },
    { name: 'এমআইএসটি', icon: <MistIcon />, color: '#7727B3' },
    { name: 'মেডিকেল', icon: <MedicalIcon />, color: '#68B327' },
    { name: 'ডেন্টাল', icon: <DentalIcon />, color: '#B36E27' },
    { name: 'এএফএমসি', icon: <AfmcIcon />, color: '#97B327' },
    { name: 'আইবিএ', icon: <IbaIcon />, color: '#2736B3' },
    { name: 'নার্সিং', icon: <NursingIcon />, color: '#B39127' },
    { name: 'গুচ্ছ', icon: <GucchoIcon />, color: '#B3277A' },
    { name: 'ঢাবি', icon: <DuIcon />, color: '#2797B3' },
    { name: 'রাবি', icon: <RuIcon />, color: '#27B38F' },
    { name: 'জাবি', icon: <JuIcon />, color: '#27B336' },
    { name: 'চবি', icon: <CuIcon />, color: '#27B3AF' },
    { name: 'জবি', icon: <JnuIcon />, color: '#97B327' },
    { name: 'কৃষি গুচ্ছ', icon: <AgriIcon />, color: '#B39127' },
    { name: 'বিসিএস', icon: <BcsIcon />, color: '#B32A2F' },
    { name: 'শাবিপ্রবি', icon: <SatCollegeIcon />, color: '#B3A533' },
];

export default function QuestionBankPage() {
  return (
    <div className="bg-background min-h-screen">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold font-body">আর্কাইভ</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-card p-1 rounded-full">
            <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
              <DDIcon className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold pr-2">৩</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="প্রশ্নব্যাংক খুঁজুন"
              className="bg-card border-border pl-9 w-48"
            />
          </div>
        </div>
      </header>
      <main className="p-6 space-y-10">
        <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">বিষয় ভিত্তিক</Button>
            <Button variant="ghost" size="sm">প্রতিষ্ঠান ভিত্তিক</Button>
            <Button variant="ghost" size="sm">মডেল টেস্ট</Button>
        </div>

        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">বিষয় ভিত্তিক</h2>
            <p className="text-sm text-muted-foreground">
              সকল বিষয়ের প্রশ্নব্যাংক
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
            {subjectCards.map((card, index) => (
              <div
                key={index}
                className={`relative rounded-xl aspect-square flex flex-col items-center justify-end p-4 text-center bg-gradient-to-br ${card.color} text-white overflow-hidden`}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {card.icon}
                </div>
                <div className="z-10 text-left w-full">
                  <h3 className="font-bold text-lg">{card.title}</h3>
                  {card.subtitle && (
                    <p className="text-sm opacity-80">{card.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
                <h2 className="text-xl font-semibold">প্রতিষ্ঠান ভিত্তিক</h2>
                <p className="text-sm text-muted-foreground">
                সকল ভর্তি পরীক্ষার প্রশ্ন
                </p>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 2xl:grid-cols-10 gap-4">
            {institutionCards.map((card, index) => (
              <div
                key={index}
                className="rounded-xl aspect-square flex flex-col items-center justify-center gap-2 p-2 text-center"
                style={{ backgroundColor: card.color }}
              >
                <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-sm text-white">
                  {card.name}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}


    