"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Course, Lesson, Module } from "@/lib/types";

import {
  Check,
  CirclePlay,
  FileText,
  HelpCircle,
  ListVideo,
  PanelLeft,
  PanelRight,
  Play,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useUserData } from "@/providers/UserDataProvider";
import { DesignedButton } from "../ui/DesignedButton";
import { useParams } from "next/navigation";

interface CourseLearnLayoutProps {
  course: Course;
  modules: Module[];
  children: React.ReactNode;
}

export function CourseLearnLayout({
  course,
  modules,
  children,
}: CourseLearnLayoutProps) {
  const params = useParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const { getLessonProgress } = useUserData();
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const activeLessonSlug = params.lessonSlug as string;

  const allLessons = React.useMemo(
    () => modules.flatMap((m) => m.lessons || []),
    [modules],
  );

  const completedLessonSlugs = getLessonProgress(course.slug);
  const completedLessonsCount = completedLessonSlugs.length;
  const totalLessons = allLessons.length;
  const courseProgress =
    totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

  const getLessonIcon = (type: "video" | "article" | "quiz") => {
    switch (type) {
      case "video":
        return Play;
      case "article":
        return FileText;
      case "quiz":
        return HelpCircle;
      default:
        return CirclePlay;
    }
  };

  const lessonListContent = (
    <Card className={cn(isSidebarCollapsed && "p-2")}>
      <CardHeader className={cn(isSidebarCollapsed && "hidden")}>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>কোর্সের বিষয়বস্তু</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completedLessonsCount}/{totalLessons}
          </span>
        </CardTitle>
        <Progress value={courseProgress} className="mt-2 h-2" />
      </CardHeader>
      <CardContent className={cn("space-y-4", isSidebarCollapsed && "p-0")}>
        {modules.map((module) => (
          <div key={module.slug}>
            <h4
              className={cn(
                "mb-2 text-base font-semibold",
                isSidebarCollapsed && "hidden",
              )}
            >
              {module.title}
            </h4>
            <div className="space-y-1">
              {module.lessons?.map((lesson) => {
                const LessonIcon = getLessonIcon(lesson.lessonType);
                const isCompleted = completedLessonSlugs.includes(lesson.slug);
                return (
                  <Link
                    key={lesson.slug}
                    href={`/courses/${course.slug}/learn/${lesson.slug}`}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg p-3 text-sm transition-colors ${
                      lesson.slug === activeLessonSlug
                        ? "bg-primary/20 text-primary-foreground"
                        : "hover:bg-accent"
                    } ${isSidebarCollapsed ? "justify-center" : ""}`}
                    title={isSidebarCollapsed ? lesson.title : undefined}
                  >
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                      {isCompleted ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      ) : (
                        <LessonIcon
                          className={`h-5 w-5 ${
                            lesson.slug === activeLessonSlug
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      )}
                    </div>
                    <div
                      className={cn("flex-1", isSidebarCollapsed && "hidden")}
                    >
                      <div
                        className={isCompleted ? "text-muted-foreground" : ""}
                      >
                        {lesson.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {lesson.duration}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const instructorCardContent = (
    <Card className={cn(isSidebarCollapsed && "hidden")}>
      <CardHeader>
        <CardTitle className="text-lg">প্রশিক্ষক</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{course.instructor}</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{4.6}</span>
            </div>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          প্রশিক্ষক সম্পর্কে জানুন
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b bg-background/80 p-4 backdrop-blur-sm sm:p-6">
        <div className="mx-auto flex max-w-full flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center xl:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleSidebar}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-10 w-10 shrink-0 text-muted-foreground hover:text-foreground rounded-full transition-transform hidden md:flex",
              )}
            >
              {isSidebarCollapsed ? (
                <PanelRight className="h-6 w-6" />
              ) : (
                <PanelLeft className="h-6 w-6" />
              )}
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold sm:text-2xl">{course.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>অগ্রগতি: {courseProgress.toFixed(0)}%</span>
                  <Progress
                    value={courseProgress}
                    className="h-2 w-24 sm:w-32"
                  />
                </div>
              </div>
            </div>
          </div>
          <DesignedButton className="w-full shrink-0 sm:w-auto" asChild>
            <Link href={`/courses/${course.slug}`}>
              <CirclePlay className="mr-2 h-5 w-5" />
              কোর্স পেজে ফিরে যান
            </Link>
          </DesignedButton>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-full flex-1">
        {/* Left Sidebar for Desktop */}
        <aside
          className={cn(
            "hidden shrink-0 border-r bg-background/50 p-6 md:block transition-all duration-300",
            isSidebarCollapsed ? "md:w-24" : "md:w-96",
          )}
        >
          <div className="space-y-6">
            {lessonListContent}
            {instructorCardContent}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Accordion for Mobile */}
          <div className="mb-6 md:hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value="lessons" className="border-none">
                <AccordionTrigger className="w-full rounded-lg bg-card px-4 py-3 text-lg font-semibold hover:bg-accent hover:no-underline">
                  <div className="flex items-center gap-2">
                    <ListVideo className="h-5 w-5" />
                    <span>কোর্সের বিষয়বস্তু</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                  {lessonListContent}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
