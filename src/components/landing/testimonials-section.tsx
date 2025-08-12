
'use client';

import Image from 'next/image';
import { Play, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

export default function TestimonialsSection() {
    return (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold">
                আমাদের শিক্ষার্থীরা চর্চা সম্পর্কে যা বলছে
              </h2>
              <p className="text-muted-foreground">
                এরকম হাজারো শিক্ষার্থীর রিভিউ দেখতে পারেন আমাদের প্লে-স্টোর পেজে
                গিয়ে।
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`rounded-lg border border-border bg-card p-6 ${
                    testimonial.isFirst ? 'lg:col-span-2' : ''
                  }`}
                >
                  {testimonial.isFirst ? (
                    <article>
                      <div className="relative mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-md bg-black">
                        <Image
                          src="https://placehold.co/600x400.png"
                          layout="fill"
                          objectFit="cover"
                          alt="Youtube thumbnail of a user testimonial"
                          className="rounded-md"
                          data-ai-hint="man presenting"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Play className="h-12 w-12 fill-current text-red-600" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.text}
                      </p>
                    </article>
                  ) : (
                    <article>
                      <div className="mb-4 flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={`${testimonial.name}'s avatar`}
                          />
                          <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <div className="flex text-yellow-400">
                            {testimonial.rating &&
                              [...Array(testimonial.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-current"
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.text}
                      </p>
                    </article>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
    )
}
