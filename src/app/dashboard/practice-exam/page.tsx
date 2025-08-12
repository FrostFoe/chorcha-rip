
'use client';

import { DDIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

const subjects = [
  { name: 'পদার্থবিজ্ঞান', color: 'green' },
  { name: 'রসায়ন', color: 'green' },
  { name: 'উচ্চতর গণিত', color: 'green' },
  { name: 'জীববিজ্ঞান', color: 'green' },
  { name: 'বাংলা', color: 'brown' },
  { name: 'English', color: 'brown' },
  { name: 'তথ্য ও যোগাযোগ প্রযুক্তি', color: 'brown' },
  { name: 'পরিসংখ্যান', color: 'brown' },
  { name: 'সাধারণ জ্ঞান', color: 'brown' },
];

export default function PracticeExamPage() {
  return (
    <div className="bg-background min-h-screen text-foreground p-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-2xl font-bold font-body">দ্রুত প্র্যাকটিস</h1>
        <div className="flex items-center gap-2 bg-card p-1 rounded-full">
          <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
            <DDIcon className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold pr-2">৩</span>
        </div>
      </header>

      <main className="space-y-4">
        {subjects.map((subject, index) => (
          <Button
            key={index}
            variant="outline"
            className={`w-full justify-start h-14 text-base font-body text-left px-6 ${
              subject.color === 'green'
                ? 'bg-[#183129] border-[#183129] text-white hover:bg-[#1f4236] hover:text-white'
                : 'bg-[#312C18] border-[#312C18] text-white hover:bg-[#423a22] hover:text-white'
            }`}
          >
            {subject.name}
          </Button>
        ))}
      </main>
    </div>
  );
}
