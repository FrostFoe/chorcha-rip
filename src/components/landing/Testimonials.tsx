import { ArrowRight, Star, User } from "lucide-react";
import Image from "next/image";
import { Card } from "../ui/card";
import { DesignedButton } from "../ui/DesignedButton";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";

// Data previously in lib/data.ts
const testimonials = [
  {
    name: "Kankhito's World",
    avatar:
      "https://play-lh.googleusercontent.com/a-/ALV-UjV8IQfoKEz-v2Wx7ISqxcrVZaU3JtekP5xwrzVPFfRdJ7I",
    review:
      "This is really a great platform for the students of HSC and Admission candidates. The app design is outstanding.....and the main thing is.....a student won't need any hardcopy book for practice if he has 'chorcha' app. There are millions of questions. Student can himself choose about his exam , after giving a exam , chorcha will show the weakness topics . Personally, I feel much fun when I use the feature ' fast practice ' .",
  },
  {
    name: "sohan ahmed",
    avatar:
      "https://play-lh.googleusercontent.com/a-/ALV-UjVvlDPdBTnN04uwb4ZGKhwS9vmJkJTgni6UxhlFuAnU168",
    review:
      "Whose who are studying only online platform, they will feel the necessity of giving exam or some sort of test. But they can't have that proper way to give it frequently. So, for them this app can be a great companion I think. Though this app does have some bugs, if they were fixed, it can be better than good.",
  },
  {
    name: "Abdullah Shahriar",
    avatar:
      "https://play-lh.googleusercontent.com/a-/ALV-UjXaZ40evr2dMx8sWjtTpZrcxD9XuGtnfr38_Rv1ZhIYRlg",
    review:
      "Chorcha is a fantastic online exam app that has helped me immensely in my studies and exam preparation. It is a comprehensive platform with a vast library of practice questions, mock exams, and other resources that cover a wide range of subjects and topics.",
  },
  {
    name: "Gaming Riyadh",
    avatar:
      "https://play-lh.googleusercontent.com/a/ACg8ocKj0ZKi-0N1Iji86iyjnxeMrYNjCs0V477Mp692qNpX",
    review:
      "This Chorcha app is very much helpful for student's exam practice. A student can easily practice exam on any chapter or topic of that chapter. So, It's very helpful for a admission student.",
  },
];

export function Testimonials() {
  return (
    <section>
      <div className="text-center py-20 pb-12 flex flex-col gap-1">
        <h1 className="text-3xl font-bold">
          আমাদের শিক্ষার্থীরা চর্চা সম্পর্কে যা বলছে
        </h1>
        <p className="text-muted-foreground">
          ৫ লক্ষ শিক্ষার্থীর সাথে আজই যুক্ত হও চর্চা তে
        </p>
      </div>
      <section className="relative mx-auto px-4 focus:outline-none sm:px-3 md:px-5">
        <div className="max-h-[1024px] md:max-h-screen overflow-hidden relative">
          <ul className="columns-1 md:columns-3 lg:columns-4 xl:columns-5 pt-2 gap-2 lg:gap-4 list-none">
            <li className="text-sm leading-6 pt-2 lg:pt-4 relative">
              <div className="rounded-xl overflow-hidden aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/1Hgd9VCV0CI?autoplay=0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  loading="lazy"
                  className="w-full h-full"
                  title="Chorcha App Review"
                />
              </div>
            </li>

            {testimonials.map((testimonial) => (
              <li
                key={testimonial.name}
                className="text-sm leading-6 pt-2 lg:pt-4 relative"
              >
                <figure className="flex flex-col-reverse card bg-card !p-4">
                  <figcaption className="flex items-center space-x-2">
                    <Avatar className="flex-none w-10 h-10 rounded-full object-cover">
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-auto">
                      <div className="text-base text-foreground font-bold tracking-tight">
                        <span>{testimonial.name}</span>
                      </div>
                      <div className="flex gap-x-1 mt-1 text-yellow-500">
                        <Star
                          className="h-3 w-3 flex-none"
                          fill="currentColor"
                        />
                        <Star
                          className="h-3 w-3 flex-none"
                          fill="currentColor"
                        />
                        <Star
                          className="h-3 w-3 flex-none"
                          fill="currentColor"
                        />
                        <Star
                          className="h-3 w-3 flex-none"
                          fill="currentColor"
                        />
                        <Star
                          className="h-3 w-3 flex-none"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  </figcaption>
                  <blockquote className="mt-1 text-muted-foreground mb-4">
                    <p className="text-sm leading-6">{testimonial.review}</p>
                  </blockquote>
                </figure>
              </li>
            ))}
          </ul>
        </div>
        <div className="inset-x-0 bottom-0 pb-32 pt-40 absolute z-[5] flex justify-center bg-gradient-to-b via-background/90 from-background/10 to-background">
          <div className="flex flex-col items-center gap-4 px-6">
            <h2 className="text-center font-bold text-2xl md:text-3xl">
              এখনই যুক্ত হও বাংলাদেশের সবচেয়ে বড় প্র্যাকটিস প্ল্যাটফর্মে
            </h2>
            <DesignedButton
              asChild
              className="!p-3 !px-6 !text-base !rounded-xl"
            >
              <Link href="/auth/register">
                <span>অ্যাকাউন্ট খুলো</span>
                <ArrowRight className="icon" />
              </Link>
            </DesignedButton>
          </div>
        </div>
      </section>
    </section>
  );
}
