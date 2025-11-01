"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { Course } from "@/lib/types";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

interface CourseClientProps {
  course: Course;
  mdxSource: MDXRemoteSerializeResult | undefined; // The serialized MDX content
}

export function CourseClient({ course, mdxSource }: CourseClientProps) {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  if (!course) {
    notFound();
  }

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
                <Button size="lg" asChild className="w-full">
                  <Link
                    href={`/courses/${course.slug}/learn`}
                    className="flex items-center gap-2"
                  >
                    <BookCheck className="h-5 w-5" />
                    {"কোর্স শুরু করুন"}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-10">
              {mdxSource && (
                <div className="border-t border-border pt-8">
                  <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                    কোর্স সম্পর্কে
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <MDXRemote {...mdxSource} />
                  </div>
                </div>
              )}

              <div className="border-t border-border pt-8">
                <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                  এই কোর্স থেকে যা শিখবেন
                </h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  {course.outcomes?.map((outcome: string) => (
                    <div key={outcome} className="flex items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon
                          name="CheckCircle"
                          className="h-5 w-5 text-primary"
                        />
                      </div>
                      <p className="text-muted-foreground">{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
