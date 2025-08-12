'use client';

import { DDIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import React from 'react';

const subjectCategories = [
  { name: 'পদার্থবিজ্ঞান', questions: null, color: 'green' },
  { name: 'রসায়ন', questions: null, color: 'green' },
  { name: 'উচ্চতর গণিত', questions: null, color: 'green' },
  { name: 'জীববিজ্ঞান', questions: '২৫/১৫৪৬৪ টি প্রশ্ন', color: 'green' },
  { name: 'বাংলা', questions: '৮৩/৯৯৮৩ টি প্রশ্ন', color: 'brown' },
  { name: 'English', questions: null, color: 'brown' },
  { name: 'তথ্য ও যোগাযোগ প্রযুক্তি', questions: null, color: 'brown' },
  { name: 'পরিসংখ্যান', questions: null, color: 'brown' },
  { name: 'সাধারণ জ্ঞান', questions: null, color: 'brown' },
];

const presetExams = [
  "ঢাবি 'ক'",
  'SUST A',
  'জাবি এ',
  'বুয়েট প্রিলি',
  'RU A',
  'কৃষি গুচ্ছ',
  'KUET',
  'RUET preli',
  'মেডিকেল',
  'চবি বিজ্ঞান',
  'রাবি গ (বিজ্ঞান)',
  'গুচ্ছ ক (বিজ্ঞান)',
  'জাবি ডি',
  'CUET',
];

export default function MockExamPage() {
  return (
    <div className="bg-background min-h-screen text-foreground p-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-2xl font-bold font-body">মক পরীক্ষা</h1>
        <div className="flex items-center gap-2 bg-card p-1 rounded-full">
          <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
            <DDIcon className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold pr-2">৩</span>
        </div>
      </header>

      <main className="space-y-10">
        <section>
          <h2 className="text-lg font-semibold font-body mb-4">
            কোন বিষয়ে পরীক্ষা দিতে চাও?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjectCategories.map((subject, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full justify-between h-14 text-base font-body ${
                  subject.color === 'green'
                    ? 'bg-[#183129] border-[#3DD579] text-white hover:bg-[#1f4236] hover:text-white'
                    : 'bg-[#312C18] border-[#D7A22A] text-white hover:bg-[#423a22] hover:text-white'
                }`}
              >
                <span>{subject.name}</span>
                {subject.questions && (
                  <Badge
                    variant="secondary"
                    className="bg-background/20 text-muted-foreground"
                  >
                    {subject.questions}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold font-body mb-4">
            প্রিসেট পরীক্ষা
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {presetExams.map((exam, index) => (
              <Button
                key={index}
                variant="secondary"
                className="font-body bg-secondary hover:bg-muted"
              >
                {exam}
              </Button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
