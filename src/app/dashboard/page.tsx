"use client";

import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import * as React from "react";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Book, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader } from "@/components/ui/loader";
import { useUserData } from "@/providers/UserDataProvider";
import { DesignedButton } from "@/components/ui/DesignedButton";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function DashboardContent() {
  const { enrolledCourses, loading } = useUserData();

  return (
    <>
      <DashboardHeader />
      <div className="space-y-8">
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Book className="h-7 w-7" />
              আমার কোর্সসমূহ
            </h2>
            {enrolledCourses.length > 4 && (
              <Button variant="link" asChild>
                <Link href="/browse">সব দেখুন</Link>
              </Button>
            )}
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader />
            </div>
          ) : enrolledCourses.length === 0 ? (
            <div className="text-center py-10 rounded-lg bg-card/50">
              <p className="text-muted-foreground">
                আপনি এখনও কোনো কোর্সে ভর্তি হননি।
              </p>
              <DesignedButton asChild className="mt-4">
                <Link href="/browse">কোর্স ব্রাউজ করুন</Link>
              </DesignedButton>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {enrolledCourses.slice(0, 4).map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <Card className="group flex flex-col overflow-hidden rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 h-full">
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-grow p-4">
                      <h3 className="mb-2 flex-grow text-lg font-semibold">
                        {course.title}
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
                      <DesignedButton asChild className="mt-auto w-full">
                        <Link href={`/courses/${course.slug}/learn`}>
                          শেখা চালিয়ে যান
                        </Link>
                      </DesignedButton>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default function DashboardPage() {
  const isMobile = useIsMobile();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const toggleSidebar = React.useCallback(
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
            ? "pt-4"
            : isSidebarCollapsed
              ? "lg:ml-sidebar-collapsed"
              : "lg:ml-sidebar-expanded",
        )}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <DashboardContent />
        </div>
      </main>
    </div>
  );
}
