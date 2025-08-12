'use client';

import { DDIcon } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';
import Image from 'next/image';

const leaderboardData = [
  {
    rank: 1087,
    name: 'Sysmad BCF-19',
    isYou: true,
    xp: '43 XP',
    avatar: 'https://placehold.co/40x40.png',
    fallback: 'SB',
    note: 'তুমি সেইফ জোনে নেই',
  },
  {
    rank: 1,
    name: 'sifat',
    xp: '285 XP',
    avatar: 'https://placehold.co/40x40/22c55e/000000.png',
    fallback: 'S',
  },
  {
    rank: 2,
    name: 'He fy Gjf',
    xp: '99.5 XP',
    avatar: 'https://placehold.co/40x40/c084fc/000000.png',
    fallback: 'HF',
  },
  {
    rank: 3,
    name: 'hridita',
    xp: '99.5 XP',
    avatar: 'https://placehold.co/40x40/f472b6/000000.png',
    fallback: 'H',
  },
];

const leagueIcons = [
  {
    src: 'https://placehold.co/64x64/6b7280/ffffff.png',
    alt: 'Iron League',
    hint: 'iron league',
  },
  {
    src: 'https://placehold.co/64x64/a16207/ffffff.png',
    alt: 'Bronze League',
    hint: 'bronze league',
  },
  {
    src: 'https://placehold.co/64x64/d1d5db/ffffff.png',
    alt: 'Silver League',
    hint: 'silver league',
  },
  {
    src: 'https://placehold.co/64x64/facc15/ffffff.png',
    alt: 'Gold League',
    hint: 'gold league',
  },
];

export default function LeaderboardPage() {
  const progressValue = 43;

  return (
    <div className="bg-background min-h-screen text-foreground p-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-2xl font-bold font-body">লিডারবোর্ড</h1>
        <div className="flex items-center gap-2 bg-card p-1 rounded-full">
          <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
            <DDIcon className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold pr-2">৩</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="bg-card p-8 rounded-xl mb-6">
          <div className="flex justify-between items-center mb-4">
            {leagueIcons.map((icon, index) => (
              <Image
                key={index}
                src={icon.src}
                alt={icon.alt}
                width={index === 0 ? 64 : 48}
                height={index === 0 ? 64 : 48}
                className={`opacity-${index === 0 ? '100' : '50'}`}
                data-ai-hint={icon.hint}
              />
            ))}
          </div>
          <div className="text-center mb-4">
            <p className="font-semibold font-body">আয়রন লীগ</p>
          </div>
          <div className="relative">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>0</span>
              <span>100</span>
            </div>
            <Progress value={progressValue} className="h-2 bg-muted" />
            <div
              className="absolute top-[16px]"
              style={{ left: `calc(${progressValue}% - 12px)` }}
            >
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" fill="white" />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {leaderboardData.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center p-4 rounded-lg ${
                player.isYou ? 'bg-primary/20' : 'bg-card'
              }`}
            >
              <p className="text-lg font-bold w-12 text-center text-muted-foreground">
                {player.rank}
              </p>
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={player.avatar} alt={player.name} />
                <AvatarFallback>{player.fallback}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p
                  className={`font-semibold ${player.isYou ? 'text-primary' : ''}`}
                >
                  {player.name}{' '}
                  {player.isYou && <span className="text-primary">(YOU)</span>}
                </p>
                {player.note && (
                  <p className="text-sm text-red-400">{player.note}</p>
                )}
              </div>
              <p className="text-right font-semibold text-lg">{player.xp}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
