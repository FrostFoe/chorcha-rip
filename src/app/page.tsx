
'use client';

import Image from 'next/image';
import {
  ArrowRight,
  BookOpen,
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
  BookMarked
} from 'lucide-react';
import Link from 'next/link';

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

const navLinks = [
  { icon: Home, text: 'প্রশ্ন ব্যাংক', href: '/dashboard/question-bank' },
  { icon: BookMarked, text: 'মক পরীক্ষা', href: '#' },
  { icon: Star, text: 'লিডারবোর্ড', href: '#' },
];

const examCategories = [
  'BUET Preli 2022',
  'Medical 2022',
  'IUT 2022',
  'Dental 2022',
  'BCS Preli 2022',
  'Rajshahi University 2022',
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

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <DDIcon className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">চর্চা</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.text}
              href={link.href}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight">
                চর্চা করো নিজের গতিতে
              </h1>
              <div className="text-gray-300 max-w-lg mx-auto md:mx-0">
                <p>নিজের প্রস্তুতির ধাপ গুলো محک করে নিন আমাদের সাথে। আন্তর্জাতিক
                মানের পরীক্ষা পদ্ধতি এখন আপনার হাতের মুঠোয়। এছাড়া লাইভ পরীক্ষা
                দেয়ার মাধ্যমে এখন দ্রুত প্রস্রুতি নেয়া সম্ভব।</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Button variant="outline" size="lg" className='w-full sm:w-auto'>
                  <GoogleIcon className="mr-2 h-5 w-5" />
                  Google Play
                </Button>
                <Button variant="outline" size="lg" className='w-full sm:w-auto'>
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
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-semibold mb-6">
                  সকল পরীক্ষার প্রশ্নব্যাংক
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {examCategories.map((exam, index) => (
                    <div
                      key={index}
                      className="bg-background/50 p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                    >
                      <h3 className="font-semibold">{exam}</h3>
                      <div className="text-sm text-muted-foreground mt-2">
                        <span>প্রশ্নঃ ১৪৩</span> <span className="mx-2">|</span> <span>সময়ঃ ৪৫ মি.</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">প্রশ্নব্যাংক বিশ্লেষণ</h2>
                  <Button variant="secondary" size="sm">
                    আরো <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="h-[250px] bg-background/50 p-4 rounded-lg border border-border">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analysisData}>
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl border border-border flex flex-col items-center text-center">
              <Image
                src="https://placehold.co/300x600.png"
                alt="Mock Test"
                width={200}
                height={400}
                className="mb-4 rounded-2xl"
                data-ai-hint="app screen"
              />
              <h3 className="text-xl font-semibold mt-2">মক পরীক্ষা</h3>
              <div className="text-muted-foreground mt-2 text-sm max-w-xs">
                <p>দেশের সেরা প্রশ্নদাতাদের দ্বারা তৈরি করা প্রশ্নপত্রে পরীক্ষা
                দিয়ে নিজের প্রস্তুতিকে করো আরও নিখুঁত।</p>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border flex flex-col items-center text-center">
               <Image
                src="https://placehold.co/300x600.png"
                alt="Result Analysis"
                width={200}
                height={400}
                className="mb-4 rounded-2xl"
                data-ai-hint="app screen analysis"
              />
              <h3 className="text-xl font-semibold mt-2">ফলাফল বিশ্লেষণ</h3>
              <div className="text-muted-foreground mt-2 text-sm max-w-xs">
                <p>প্রতিটি পরীক্ষার পর পেয়ে যাও পূর্ণাঙ্গ বিষয়ভিত্তিক ও
                প্রশ্নভিত্তিক বিশ্লেষণ, যা তোমাকে সাহায্য করবে নিজের দুর্বলতা খুঁজে
                বের করতে।</p>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border flex flex-col items-center text-center">
              <Image
                src="https://placehold.co/300x600.png"
                alt="Analysis"
                width={200}
                height={400}
                className="mb-4 rounded-2xl"
                data-ai-hint="app screen leaderboard"
              />
              <h3 className="text-xl font-semibold mt-2">প্রশ্নব্যাংক বিশ্লেষণ</h3>
              <div className="text-muted-foreground mt-2 text-sm max-w-xs">
                <p>বিগত বছরের প্রশ্নপত্রে পরীক্ষা দিয়ে বুঝে নাও প্রশ্নের ধরন এবং
                নিজের প্রস্তুতিকে করো আরও শক্তিশালী।</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card py-16">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
            <div className="bg-background/50 p-6 rounded-xl border border-border">
              <h3 className="text-xl font-semibold mb-4">দ্রুত প্র্যাকটিস</h3>
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
            <div className="bg-background/50 p-6 rounded-xl border border-border">
              <h3 className="text-xl font-semibold mb-4">লাইভ লিডারবোর্ড</h3>
              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center gap-4 p-2 rounded-md bg-background/50 border border-border"
                  >
                    <Badge variant="secondary" className="text-lg bg-card text-foreground">
                      {player.rank}
                    </Badge>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={player.avatar} />
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

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">
                আমাদের শিক্ষার্থীরা চর্চা সম্পর্কে যা বলছে
                </h2>
                <p className="text-muted-foreground">
                এরকম হাজারো শিক্ষার্থীর রিভিউ দেখতে পারেন আমাদের প্লে-স্টোর পেজে
                গিয়ে।
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`bg-card p-6 rounded-lg border border-border ${
                    testimonial.isFirst ? 'lg:col-span-2' : ''
                  }`}
                >
                  {testimonial.isFirst ? (
                    <div>
                      <div className="aspect-video bg-black rounded-md flex items-center justify-center mb-4 relative overflow-hidden">
                        <Image
                          src="https://placehold.co/600x400.png"
                          layout="fill"
                          objectFit="cover"
                          alt="Youtube thumbnail"
                          className="rounded-md"
                          data-ai-hint="man presenting"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                           <Play className="h-12 w-12 text-red-600 fill-current" />
                        </div>
                      </div>
                       <p className="text-sm text-muted-foreground">{testimonial.text}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={testimonial.avatar} />
                          <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <div className="flex text-yellow-400">
                            {testimonial.rating && [...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
           <div className="bg-card p-8 rounded-xl border border-border flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-semibold mb-2">এখনই যুক্ত হও বাংলাদেশের সবচেয়ে বড় প্র্যাকটিস প্ল্যাটফর্মে</h2>
                <p className="text-muted-foreground">বাংলাদেশের প্রথম অ্যাপ্লিকেশন যেখানে তুমি পাবে তোমার প্রয়োজন অনুযায়ী সবকিছু।</p>
              </div>
              <Button size="lg" className="flex-shrink-0" asChild>
                <Link href="/sign-in">
                  জয়েন করো এখনই <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
           </div>
        </section>
      </main>

      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="col-span-full sm:col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <DDIcon className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">চর্চা</span>
              </Link>
              <div className="flex gap-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white flex items-center justify-center"><Instagram /></a>
                <a href="#" className="text-gray-400 hover:text-white flex items-center justify-center"><Youtube /></a>
                <a href="#" className="text-gray-400 hover:text-white flex items-center justify-center"><Linkedin /></a>
              </div>
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> 01825-302379</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> info.chorcha@gmail.com</div>
                <p>Dhaka, House-969, Road-09, Avenue-11, Mirpur DOHS, 1216</p>
              </div>
            </div>
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="col-span-1">
                <h4 className="font-semibold mb-4">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-white">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-border">
            <p className="text-sm text-gray-500 text-center md:text-left">&copy; 2024 Chorcha. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
               <Button variant="outline" size="lg">
                  <GoogleIcon className="mr-2 h-5 w-5" />
                  Google Play
                </Button>
                <Button variant="outline" size="lg">
                  <AppleIcon className="mr-2 h-5 w-5" />
                  App Store
                </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
