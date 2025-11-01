"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, BookOpen } from "lucide-react";
import { useState, useCallback } from "react";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { useUserData } from "@/providers/UserDataProvider";

export default function MyCoursesPage() {
  const isMobile = useIsMobile();
  const { enrolledCourses, loading } = useUserData();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = useCallback(
    () => setIsSidebarCollapsed((prev) => !prev),
    [],
  );

  return (
    <div className="min-h-screen bg-background">
      {isMobile ? (
        <MobileNav />
      ) : (
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
      )}
      <main
        className={cn(
          "pb-mobile-nav lg:pb-0 transition-[margin-left] duration-300",
          isMobile
            ? "pt-16"
            : isSidebarCollapsed
              ? "lg:ml-sidebar-collapsed"
              : "lg:ml-sidebar-expanded",
        )}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              আমার কোর্সসমূহ
            </h1>
            <p className="text-muted-foreground mt-2">
              আপনার এনরোল করা সকল কোর্স এখানে দেখুন।
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : enrolledCourses.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                আপনি এখনও কোনো কোর্সে ভর্তি হননি।
              </p>
              <Button asChild className="mt-4">
                <Link href="/browse">কোর্স ব্রাউজ করুন</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {enrolledCourses.map((course) => (
                <Card
                  key={course.id}
                  className="group flex flex-col overflow-hidden rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={course.thumbnail}
                      alt={course.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="mb-2 flex-grow text-lg font-semibold">
                      {course.name}
                    </h3>
                    <Progress value={course.progress} className="h-2" />
                    <div className="mt-2 mb-4 flex items-center justify-between text-sm text-muted-foreground">
                      <span>সম্পন্ন: {course.progress}%</span>
                      {course.progress === 100 && (
                        <span className="flex items-center gap-1 text-primary">
                          <CheckCircle2 className="h-4 w-4" /> সম্পন্ন হয়েছে
                        </span>
                      )}
                    </div>
                    <Button
                      asChild
                      className="mt-auto w-full transition-colors duration-300"
                    >
                      <Link href={`/courses/${course.slug}/learn`}>
                        শেখা চালিয়ে যান
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
