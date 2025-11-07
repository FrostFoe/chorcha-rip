"use client";

import { useParams, useRouter } from "next/navigation";
import * as React from "react";
import { useUserData } from "@/providers/UserDataProvider";
import type { Course, Lesson } from "@/lib/types";
import { Loader } from "@/components/ui/loader";

interface CourseResumeRedirectProps {
  course: Course;
  allLessons: Lesson[];
}

export function CourseResumeRedirect({
  course,
  allLessons,
}: CourseResumeRedirectProps) {
  const router = useRouter();
  const { getLessonProgress } = useUserData();
  const { slug } = course;

  React.useEffect(() => {
    if (allLessons.length === 0) {
      // No lessons in this course, redirect to course details page
      router.replace(`/courses/${slug}`);
      return;
    }

    const completedSlugs = getLessonProgress(slug);
    const completedSlugsSet = new Set(completedSlugs);

    // Find the first lesson that is NOT in the completed set
    const nextLesson = allLessons.find(
      (lesson) => !completedSlugsSet.has(lesson.slug),
    );

    // If a next uncompleted lesson is found, redirect to it.
    // Otherwise (if all are completed), redirect to the very first lesson.
    const lessonToRedirect = nextLesson || allLessons[0];

    if (lessonToRedirect) {
      router.replace(`/courses/${slug}/learn/${lessonToRedirect.slug}`);
    } else {
      // Fallback in case something unexpected happens
      router.replace(`/courses/${slug}`);
    }
  }, [slug, allLessons, getLessonProgress, router]);

  return (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader />
        <p className="text-muted-foreground">আপনার পাঠে ফিরে যাওয়া হচ্ছে...</p>
      </div>
    </div>
  );
}
