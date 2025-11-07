"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookCheck, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/types";
import { useUserData } from "@/providers/UserDataProvider";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { DesignedButton } from "@/components/ui/DesignedButton";

interface CourseClientProps {
  course: Course;
}

export function CourseClient({ course }: CourseClientProps) {
  const { enrollCourse, isEnrolled, bitcoinBalance, spendGems } = useUserData();
  const { toast } = useToast();
  const router = useRouter();

  const handleEnroll = () => {
    // Ensure course.price is treated as a number
    const coursePrice = Number(course.price);
    if (bitcoinBalance >= coursePrice) {
      spendGems(coursePrice);
      enrollCourse(course.id);
      toast({
        title: "সাফল্য!",
        description: `আপনি "${course.title}" কোর্সে সফলভাবে ভর্তি হয়েছেন।`,
      });
      router.push(`/courses/${course.slug}/learn`);
    } else {
      toast({
        variant: "destructive",
        title: "অপর্যাপ্ত Bitcoin!",
        description:
          "আপনার Bitcoin ব্যালেন্স অপর্যাপ্ত। অনুগ্রহ করে Bitcoin কিনুন।",
        action: (
          <Button variant="secondary" size="sm" asChild>
            <Link href="/store">Bitcoin কিনুন</Link>
          </Button>
        ),
      });
    }
  };

  const isAlreadyEnrolled = isEnrolled(course.id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pb-20">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>সব কোর্সে ফিরে যান</span>
              </Link>
            </Button>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-xl md:aspect-[16/7]">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
              <div className="flex-1">
                <h1 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                  {course.title}
                </h1>
                <p className="mt-2 text-base text-muted-foreground sm:text-lg">
                  - {course.instructor}
                </p>
              </div>
              <div className="w-full shrink-0 space-y-2 md:w-auto">
                {isAlreadyEnrolled ? (
                  <DesignedButton asChild className="w-full">
                    <Link
                      href={`/courses/${course.slug}/learn`}
                      className="flex items-center gap-2"
                    >
                      <BookCheck className="h-5 w-5" />
                      {"শেখা চালিয়ে যান"}
                    </Link>
                  </DesignedButton>
                ) : (
                  <>
                    <DesignedButton className="w-full" onClick={handleEnroll}>
                      <Coins className="mr-2 h-5 w-5" />
                      ভর্তি হোন
                    </DesignedButton>
                    <Badge
                      variant="secondary"
                      className="w-full justify-center py-2 text-base"
                    >
                      <Coins className="mr-2 h-4 w-4 text-primary" />
                      কোর্সের মূল্য: {course.price} Bitcoin
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-10">
              <div className="border-t border-border pt-8">
                <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                  কোর্স সম্পর্কে
                </h2>
                {course.description ? (
                  <div
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: User-controlled HTML content from admin panel is intentional
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                ) : (
                  <div className="prose prose-invert max-w-none">
                    {course.body}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
