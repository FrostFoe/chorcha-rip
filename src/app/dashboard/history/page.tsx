'use client';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Eye, Lock } from 'lucide-react';
import React from 'react';

const subjects = [
  'পদার্থবিজ্ঞান',
  'রসায়ন',
  'উচ্চতর গণিত',
  'জীববিজ্ঞান',
  'বাংলা',
  'English',
  'তথ্য ও যোগাযোগ প্রযুক্তি',
  'পরিসংখ্যান',
  'সাধারণ জ্ঞান',
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = React.useState('প্রশ্ন');
  const [activeSubject, setActiveSubject] = React.useState('পদার্থবিজ্ঞান');

  return (
    <div className="bg-background text-foreground flex flex-col h-screen p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold font-body">হিস্ট্রি</h1>
        <div className="flex items-center gap-2 bg-card p-1 rounded-full">
          <Button
            size="sm"
            onClick={() => setActiveTab('প্রশ্ন')}
            variant={activeTab === 'প্রশ্ন' ? 'default' : 'ghost'}
            className="rounded-full px-6"
          >
            প্রশ্ন
          </Button>
          <Button
            onClick={() => setActiveTab('পরীক্ষা')}
            variant={activeTab === 'পরীক্ষা' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-full px-6 text-muted-foreground hover:text-foreground"
          >
            পরীক্ষা
          </Button>
          <Button
            onClick={() => setActiveTab('রিপোর্ট')}
            variant={activeTab === 'রিপোর্ট' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-full px-6 text-muted-foreground hover:text-foreground"
          >
            রিপোর্ট
          </Button>
        </div>
      </header>
      <div className="px-4">
        <Carousel
          opts={{
            align: 'start',
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {subjects.map((subject, index) => (
              <CarouselItem key={index} className="basis-auto">
                <Button
                  onClick={() => setActiveSubject(subject)}
                  variant={activeSubject === subject ? 'secondary' : 'ghost'}
                  className="rounded-full font-body text-muted-foreground"
                >
                  {subject}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="h-8 w-8 -left-4 bg-card border-border hover:bg-muted" />
          <CarouselNext className="h-8 w-8 -right-4 bg-card border-border hover:bg-muted" />
        </Carousel>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            No questions found. Upgrade to premium to see more questions.
          </p>
          <Button className="bg-primary hover:bg-primary/90 w-full max-w-sm font-body h-12 text-base">
            <Lock className="h-4 w-4 mr-2" />
            আরও প্রশ্ন দেখতে চর্চা প্রিমিয়ামে আপগ্রেড করো
          </Button>
        </div>
      </main>

      <div className="absolute right-8 bottom-8">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-primary/20 text-primary hover:bg-primary/30 h-12 w-12"
        >
          <Eye className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
