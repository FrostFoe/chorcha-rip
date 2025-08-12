
'use client';

import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const leaderboard = [
    {
      rank: 1,
      name: 'Shiwat Jaman',
      institution: 'National University, Bangladesh',
      avatar: 'https://placehold.co/40x40/FEF08A/000000.png',
      fallback: 'SJ',
    },
    {
      rank: 2,
      name: 'Pretly Little Baby',
      institution: 'Marienand College',
      avatar: 'https://placehold.co/40x40/A7F3D0/000000.png',
      fallback: 'PL',
    },
    {
      rank: 3,
      name: 'Moon',
      institution: 'Sylhet Govt. Women’s College',
      avatar: 'https://placehold.co/40x40/FBCFE8/000000.png',
      fallback: 'M',
    },
    {
      rank: 4,
      name: 'Khadija',
      institution: 'Saidpur government college, Nilphamari.',
      avatar: 'https://placehold.co/40x40/BAE6FD/000000.png',
      fallback: 'K',
    },
  ];

export default function PracticeSection() {
    return (
        <section className="bg-card py-16">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background/50 p-6">
              <h3 className="mb-4 text-xl font-semibold">দ্রুত প্র্যাকটিস</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  size="lg"
                >
                  বিষয় নির্বাচন করুন <ChevronDown />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  size="lg"
                >
                  পত্র নির্বাচন করুন <ChevronDown />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  size="lg"
                >
                  অধ্যায় নির্বাচন করুন <ChevronDown />
                </Button>
                <Button className="w-full" size="lg">
                  প্র্যাকটিস শুরু করুন
                </Button>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background/50 p-6">
              <h3 className="mb-4 text-xl font-semibold">লাইভ লিডারবোর্ড</h3>
              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center gap-4 rounded-md border border-border bg-background/50 p-2"
                  >
                    <Badge
                      variant="secondary"
                      className="text-lg bg-card text-foreground"
                    >
                      {player.rank}
                    </Badge>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={player.avatar}
                        alt={`${player.name} avatar`}
                      />
                      <AvatarFallback>{player.fallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{player.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {player.institution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
    )
}
