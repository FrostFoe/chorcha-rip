"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Quiz } from "@/components/courses/Quiz";
import * as React from "react";
import { useSupabase } from "@/app/supabase-provider";
import type { Course, Lesson, QuizQuestion } from "@/lib/types";
import { useUserData } from "@/providers/UserDataProvider";
import { DesignedButton } from "@/components/ui/DesignedButton";
import sanitizeHtml from "sanitize-html";

interface LessonClientProps {
  course: Course;
  lesson: Lesson;
}

export function LessonClient({ course, lesson }: LessonClientProps) {
  const { session } = useSupabase();
  const { getLessonProgress, updateLessonProgress } = useUserData();

  const isCompleted = React.useMemo(() => {
    if (!session?.user) return false;
    const completedSlugs = getLessonProgress(course.slug);
    return completedSlugs.includes(lesson.slug);
  }, [session, course.slug, lesson.slug, getLessonProgress]);

  const handleMarkAsComplete = React.useCallback(() => {
    if (!session?.user || !course || !lesson) return;
    updateLessonProgress(course.slug, lesson.slug);
  }, [session, course, lesson, updateLessonProgress]);

  const renderContent = () => {
    switch (lesson.lessonType) {
      case "video":
        return (
          <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${lesson.content}`}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        );
      case "article":
        return (
          <Card>
            <CardContent className="prose prose-invert max-w-none p-6 text-muted-foreground">
              <div
                // biome-ignore lint/security/noDangerouslySetInnerHtml: User-controlled HTML content from admin panel is intentional and sanitized
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(lesson.content as string),
                }}
              />
            </CardContent>
          </Card>
        );
      case "quiz":
        return lesson.content && typeof lesson.content !== "string" ? (
          <Quiz
            questions={lesson.content as QuizQuestion[]}
            onQuizComplete={handleMarkAsComplete}
          />
        ) : (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold">কুইজ</h3>
              <p className="text-muted-foreground">
                এই লেকচারের জন্য কুইজ এখনো প্রস্তুত নয়।
              </p>
            </CardContent>
          </Card>
        );
      default:
        return <p>Unknown lesson type</p>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">{lesson.title}</h2>
        {lesson.lessonType !== "quiz" && (
          <DesignedButton
            onClick={handleMarkAsComplete}
            disabled={isCompleted}
            className="shrink-0"
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            {isCompleted ? "সম্পন্ন হয়েছে" : "সম্পন্ন হিসাবে চিহ্নিত করুন"}
          </DesignedButton>
        )}
      </div>
      {renderContent()}
    </div>
  );
}
