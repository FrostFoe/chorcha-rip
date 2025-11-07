"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Compass, Coins, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DesignedButton } from "@/components/ui/DesignedButton";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { Sidebar } from "@/components/dashboard/Sidebar";
import type { Course } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface BrowseClientProps {
  courses: Course[];
}

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

export function BrowseClient({ courses }: BrowseClientProps) {
  const isMobile = useIsMobile();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const toggleSidebar = React.useCallback(
    () => setIsSidebarCollapsed((prev) => !prev),
    [],
  );

  const categories = ["all", ...new Set(courses.map((c) => c.category))];

  const filteredCourses = React.useMemo(() => {
    return courses
      .filter((course) => {
        if (selectedCategory === "all") return true;
        return course.category === selectedCategory;
      })
      .filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [courses, selectedCategory, searchTerm]);

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Compass className="w-8 h-8" />
              ব্রাউজ
            </h1>
            <p className="text-muted-foreground mt-2">
              আপনার পছন্দের কোর্সটি খুঁজে নিন এবং শেখা শুরু করুন।
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="কোর্স খুঁজুন..."
                className="w-full rounded-lg bg-card pl-10 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === "all" ? "সব" : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredCourses.map((course) => (
                <motion.div key={course.slug} variants={itemVariants}>
                  <Card className="group flex flex-col overflow-hidden rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 h-full">
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge className="absolute top-2 right-2 flex items-center gap-1.5">
                        <Coins className="h-4 w-4" />
                        {course.price}
                      </Badge>
                    </div>
                    <div className="flex flex-col flex-grow p-4">
                      <h3 className="mb-2 flex-grow text-lg font-semibold">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {course.instructor}
                      </p>
                      <DesignedButton asChild className="mt-auto w-full">
                        <Link href={`/courses/${course.slug}`}>
                          কোর্স দেখুন
                        </Link>
                      </DesignedButton>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                দুঃখিত, কোনো কোর্স খুঁজে পাওয়া যায়নি।
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
