
'use client';

import Image from 'next/image';
import { AnimatedCard } from '../ui/animated-card';

export default function FeaturesSection() {
    return (
        <section className="bg-background py-16">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3">
            <AnimatedCard>
                <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center h-full">
                <Image
                    src="https://placehold.co/300x600.png"
                    alt="Mock Test"
                    width={200}
                    height={400}
                    className="mb-4 rounded-2xl"
                    data-ai-hint="app screen"
                />
                <h3 className="mt-2 text-xl font-semibold">মক পরীক্ষা</h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    দেশের সেরা প্রশ্নদাতাদের দ্বারা তৈরি করা প্রশ্নপত্রে পরীক্ষা
                    দিয়ে নিজের প্রস্তুতিকে করো আরও নিখুঁত।
                </p>
                </div>
            </AnimatedCard>
            <AnimatedCard>
                <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center h-full">
                <Image
                    src="https://placehold.co/300x600.png"
                    alt="Result Analysis"
                    width={200}
                    height={400}
                    className="mb-4 rounded-2xl"
                    data-ai-hint="app screen analysis"
                />
                <h3 className="mt-2 text-xl font-semibold">ফলাফল বিশ্লেষণ</h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    প্রতিটি পরীক্ষার পর পেয়ে যাও পূর্ণাঙ্গ বিষয়ভিত্তিক ও
                    প্রশ্নভিত্তিক বিশ্লেষণ, যা তোমাকে সাহায্য করবে নিজের দুর্বলতা খুঁজে
                    বের করতে।
                </p>
                </div>
            </AnimatedCard>
            <AnimatedCard>
                <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center h-full">
                <Image
                    src="https://placehold.co/300x600.png"
                    alt="Analysis"
                    width={200}
                    height={400}
                    className="mb-4 rounded-2xl"
                    data-ai-hint="app screen leaderboard"
                />
                <h3 className="mt-2 text-xl font-semibold">
                    প্রশ্নব্যাংক এনালাইসিস
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    বিগত বছরের প্রশ্নপত্রে পরীক্ষা দিয়ে বুঝে নাও প্রশ্নের ধরন এবং
                    নিজের প্রস্তুতিকে করো আরও শক্তিশালী।
                </p>
                </div>
            </AnimatedCard>
          </div>
        </section>
    )
}
