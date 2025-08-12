
'use client';

import Image from 'next/image';
import {
  ArrowRight,
  BookMarked,
  ChevronDown,
  Home,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Phone,
  Play,
  Star,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DDIcon, GoogleIcon, AppleIcon } from '@/components/icons';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';

const navLinks = [
  { icon: Home, text: 'প্রশ্ন ব্যাংক', href: '/dashboard/question-bank' },
  { icon: BookMarked, text: 'মক পরীক্ষা', href: '/dashboard/mock-exam' },
  { icon: Star, text: 'লিডারবোর্ড', href: '/dashboard/leaderboard' },
];

const examCategories = [
  'BUET Preli 2022',
  'Medical 2022',
  'IUT 2022',
  'Dental 2022',
  'BCS Preli 2022',
  'Rajshahi University 2022',
  'Dhaka University A 2022',
  'CKRUET 2022',
];

const analysisData = [
  { year: '2017', value: 250 },
  { year: '2018', value: 300 },
  { year: '2019', value: 280 },
  { year: '2020', value: 350 },
  { year: '2021', value: 320 },
  { year: '2022', value: 280 },
];

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

const testimonials = [
  {
    name: "Kankhito's World",
    avatar: 'https://placehold.co/40x40/DDD6FE/000000.png',
    fallback: 'KW',
    text: "This is a really great platform for the students of HSC and Admission candidates. The app design is outstanding ... and the main thing is ... a student won't need to buy any books for MCQ ... if he practices... from here.",
    isFirst: true,
  },
  {
    name: 'Mujib Mujib',
    rating: 5,
    avatar: 'https://placehold.co/40x40/A7F3D0/000000.png',
    fallback: 'MM',
    text: 'This is most useful educational app I have ever found. If a student wants he can practice most of all academic, medical engineering, versity, favourite subject by practicing mcq exam in this app. Thanks Chorcha❤.',
  },
  {
    name: 'Mohammad Kanon',
    rating: 5,
    avatar: 'https://placehold.co/40x40/BAE6FD/000000.png',
    fallback: 'MK',
    text: "At the beginning, I want to say that it is a modern app I like this app because I can practice more. I request thee for giving us such a beautiful app. Please pray for me that I can fulfill my dreams and serve my parents' from shine.",
  },
  {
    name: 'Nazifa Tasnim',
    rating: 5,
    avatar: 'https://placehold.co/40x40/FBCFE8/000000.png',
    fallback: 'NT',
    text: 'Best educational app ever... it’s really good for exam preparation 🙏',
  },
  {
    name: 'Talha Sunit',
    rating: 5,
    avatar: 'https://placehold.co/40x40/DDD6FE/000000.png',
    fallback: 'TS',
    text: 'Kankhito app ... is a true ... candidate it is very helpful for student like us.. thank you 🙏',
  },
  {
    name: 'MD Sagar khan',
    rating: 5,
    avatar: 'https://placehold.co/40x40/FEF08A/000000.png',
    fallback: 'MS',
    text: 'Chorcha is my favourite app because in this app has many questions for the students.',
  },
  {
    name: 'Butterfly is Flying',
    rating: 5,
    avatar: 'https://placehold.co/40x40/A7F3D0/000000.png',
    fallback: 'BF',
    text: 'It was a very helpful app.. I can’t explain how helpful the app is. I was looking for this app for long time. Finally i found it. Thank you very much Chorcha team.',
  },
];

const footerLinks = {
  Features: ['Mock Exam', 'Question Bank', 'Leaderboard'],
  Streams: ['SSC Science', 'HSC Science', 'HSC Arts', 'HSC Commerce', 'BCS/Job'],
  Company: ['About', 'Affiliate', 'Jobs', 'FAQ'],
  Legal: [
    'Terms & Conditions',
    'Privacy Policy',
    'Refund Policy',
    'A-TIN-MUSHOK-371817097050',
    'Trade license No, TRAD/DNCC/011197/2023',
  ],
};

const DynamicFeaturesSection = dynamic(() => import('@/components/landing/features-section'), {
  loading: () => <Skeleton className="h-[400px] w-full" />,
});

const DynamicPracticeSection = dynamic(() => import('@/components/landing/practice-section'), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
});

const DynamicTestimonialsSection = dynamic(() => import('@/components/landing/testimonials-section'), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
});

const DynamicFooter = dynamic(() => import('@/components/landing/footer'), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
});

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      <header className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <DDIcon className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">চর্চা</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.text}
              href={link.href}
              className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
            >
              <link.icon className="h-4 w-4" />
              {link.text}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild>
            <Link href="/sign-in">
              লগইন/রেজিস্ট্রেশন <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <SheetHeader className="p-8 pb-0">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate to different parts of the application.
                </SheetDescription>
                <Link href="/" className="flex items-center gap-2">
                  <DDIcon className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold">চর্চা</span>
                </Link>
              </SheetHeader>
              <div className="flex flex-col gap-8 p-8">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.text}
                      href={link.href}
                      className="flex items-center gap-3 text-lg text-gray-300 hover:text-white"
                    >
                      <link.icon className="h-5 w-5" />
                      {link.text}
                    </Link>
                  ))}
                </nav>
                <Button asChild>
                  <Link href="/sign-in">
                    লগইন/রেজিস্ট্রেশন <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-5xl font-bold leading-tight text-primary md:text-6xl">
                চর্চা করো নিজের গতিতে
              </h1>
              <p className="mx-auto max-w-lg text-gray-300 md:mx-0">
                নিজের প্রস্তুতির ধাপ গুলো যাচাই করে নাও আমাদের সাথে। আন্তর্জাতিক
                মানের পরীক্ষা পদ্ধতি এখন তোমার হাতের মুঠোয়।
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <GoogleIcon className="mr-2 h-5 w-5" />
                  Google Play
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <AppleIcon className="mr-2 h-5 w-5" />
                  App Store
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://placehold.co/375x750.png"
                alt="App screenshot"
                width={375}
                height={750}
                className="mx-auto rounded-3xl"
                data-ai-hint="app screenshot"
              />
            </div>
          </div>
        </section>

        <section className="bg-card py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <h2 className="mb-6 text-2xl font-semibold">
                  সকল পরীক্ষার প্রশ্নব্যাংক
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {examCategories.map((exam, index) => (
                    <div
                      key={index}
                      className="cursor-pointer rounded-lg border border-border bg-background/50 p-4 transition-colors hover:border-primary"
                    >
                      <h3 className="font-semibold">{exam}</h3>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <span>প্রশ্নঃ ১৪৩</span>{' '}
                        <span className="mx-2">|</span>{' '}
                        <span>সময়ঃ ৪৫ মি.</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">
                    প্রশ্নব্যাংক এনালাইসিস
                  </h2>
                  <Button variant="secondary" size="sm">
                    আরো <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="h-[250px] rounded-lg border border-border bg-background/50 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analysisData}>
                      <Bar
                        dataKey="value"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <DynamicFeaturesSection />
        <DynamicPracticeSection />
        <DynamicTestimonialsSection />

        <section className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-border bg-card p-8 md:flex-row">
            <div className="text-center md:text-left">
              <h2 className="mb-2 text-2xl font-semibold">
                এখনই যুক্ত হও বাংলাদেশের সবচেয়ে বড় প্র্যাকটিস প্ল্যাটফর্মে
              </h2>
              <p className="text-muted-foreground">
                বাংলাদেশের প্রথম অ্যাপ্লিকেশন যেখানে তুমি পাবে তোমার প্রয়োজন
                অনুযায়ী সবকিছু।
              </p>
            </div>
            <Button size="lg" className="flex-shrink-0" asChild>
              <Link href="/sign-in">
                জয়েন করো এখনই <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <DynamicFooter />
    </div>
  );
}
