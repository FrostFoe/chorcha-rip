"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Course } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const COURSES_PER_PAGE = 12;

interface CoursesClientProps {
  courses: Course[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

export function CoursesClient({ courses: initialCourses }: CoursesClientProps) {
  const [courses, setCourses] = React.useState<Course[]>(initialCourses);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isReordering, setIsReordering] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    setCourses(initialCourses);
  }, [initialCourses]);

  const handleReorderCourse = async (
    currentIndex: number,
    direction: "up" | "down",
  ) => {
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= courses.length) return;

    try {
      setIsReordering(true);
      const response = await fetch("/api/admin/courses/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromIndex: currentIndex,
          toIndex: newIndex,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses);
        toast({
          title: "সাফল্য",
          description: `কোর্স ${direction === "up" ? "উপরে" : "নিচে"} সরানো হয়েছে।`,
        });
      } else {
        toast({
          title: "ত্রুটি",
          description: "কোর্সের ক্রম পরিবর্তন করতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to reorder courses:", error);
      toast({
        title: "ত্রুটি",
        description: "কোর্সের ক্রম পরিবর্তন করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    } finally {
      setIsReordering(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/courses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCourses(courses.filter((c) => c.id !== id));
        setDeleteId(null);
        toast({
          title: "সাফল্য",
          description: "কোর্স সফলভাবে মুছে ফেলা হয়েছে।",
        });
      } else {
        toast({
          title: "ত্রুটি",
          description: "কোর্স মুছে ফেলতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to delete course:", error);
      toast({
        title: "ত্রুটি",
        description: "কোর্স মুছে ফেলতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(courses.length / COURSES_PER_PAGE);
  const startIdx = (currentPage - 1) * COURSES_PER_PAGE;
  const paginatedCourses = courses.slice(startIdx, startIdx + COURSES_PER_PAGE);

  // Reset to first page when courses change
  React.useEffect(() => {
    setCurrentPage(1);
  }, []);

  const handleExport = () => {
    if (courses.length === 0) {
      toast({
        title: "ত্রুটি",
        description: "এক্সপোর্ট করার মতো কোনো কোর্স নেই।",
        variant: "destructive",
      });
      return;
    }

    try {
      const dataStr = JSON.stringify(courses, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });

      // Check file size (warn if > 10MB)
      if (dataBlob.size > 10 * 1024 * 1024) {
        toast({
          title: "সতর্কতা",
          description: "ফাইলের আকার বড়, এক্সপোর্ট হতে সময় লাগতে পারে।",
        });
      }

      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `courses-backup-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "সাফল্য",
        description: `${courses.length} কোর্স এক্সপোর্ট করা হয়েছে (${(dataBlob.size / 1024).toFixed(2)} KB)।`,
      });
    } catch (error) {
      console.error("Export failed:", error);
      toast({
        title: "ত্রুটি",
        description: "কোর্স এক্সপোর্ট করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Validate file size (max 5MB)
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "ত্রুটি",
          description: `ফাইল আকার খুব বড় (সর্বোচ্চ ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(1)}MB)।`,
          variant: "destructive",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      // Validate file type
      if (!file.name.endsWith(".json")) {
        toast({
          title: "ত্রুটি",
          description: "শুধুমাত্র JSON ফাইল ইম্পোর্ট করা যাবে।",
          variant: "destructive",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      const text = await file.text();
      const importedCourses = JSON.parse(text) as Course[];

      if (!Array.isArray(importedCourses)) {
        toast({
          title: "ত্রুটি",
          description:
            "ভুল ফরম্যাট। অনুগ্রহ করে কোর্সের একটি অ্যারে ইম্পোর্ট করুন।",
          variant: "destructive",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      if (importedCourses.length === 0) {
        toast({
          title: "সতর্কতা",
          description: "ইম্পোর্ট করার জন্য কোনো কোর্স পাওয়া যায়নি।",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      // Validate each course has required fields
      const validCourses = importedCourses.filter((course) => {
        return course.id && course.title;
      });

      if (validCourses.length !== importedCourses.length) {
        toast({
          title: "সতর্কতা",
          description: `${importedCourses.length - validCourses.length} টি ভুল কোর্স বাদ দেওয়া হয়েছে।`,
        });
      }

      // Check for duplicates
      const existingIds = new Set(courses.map((c) => c.id));
      const duplicateCount = validCourses.filter((c) =>
        existingIds.has(c.id),
      ).length;

      if (duplicateCount > 0) {
        toast({
          title: "তথ্য",
          description: `${duplicateCount} টি কোর্স আগে থেকেই ছিল, তাই সেগুলো বাদ দেওয়া হয়েছে।`,
        });
      }

      const newCourses = validCourses.filter((c) => !existingIds.has(c.id));
      setCourses([...courses, ...newCourses]);

      toast({
        title: "সাফল্য",
        description: `${newCourses.length} টি নতুন কোর্স সফলভাবে ইম্পোর্ট করা হয়েছে।`,
      });
    } catch (error) {
      console.error("Import failed:", error);

      if (error instanceof SyntaxError) {
        toast({
          title: "ত্রুটি",
          description: "ভুল JSON ফরম্যাট। ফাইলটি সম্ভবত ত্রুটিপূর্ণ।",
          variant: "destructive",
        });
      } else {
        toast({
          title: "ত্রুটি",
          description: "ফাইল ইম্পোর্ট করতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            কোর্স ব্যবস্থাপনা
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">
            নতুন কোর্স তৈরি করুন
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={courses.length === 0}
            className="w-full sm:w-auto"
            aria-label="Export all courses as JSON"
          >
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">এক্সপোর্ট</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto"
            aria-label="Import courses from JSON file"
          >
            <Upload className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">ইমপোর্ট</span>
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            aria-label="JSON file input for importing courses"
          />
          <Button asChild size="sm" className="w-full sm:w-auto">
            <Link href="/admin/courses/new">
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">নতুন কোর্স</span>
              <span className="sm:hidden">যোগ করুন</span>
            </Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">লোড হচ্ছে...</p>
        </div>
      ) : courses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <p className="text-muted-foreground mb-4">
              কোনো কোর্স পাওয়া যায়নি
            </p>
            <Button asChild size="sm">
              <Link href="/admin/courses/new">নতুন কোর্স</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              মোট {courses.length} কোর্স • পৃষ্ঠা {currentPage} এর {totalPages}
            </p>
          </div>

          <motion.div
            className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {paginatedCourses.map((course, index) => {
              const originalIndex = startIdx + index;
              return (
                <motion.div key={course.id} variants={itemVariants}>
                  <Card className="overflow-hidden flex flex-col group h-full">
                    <div className="relative">
                      {course.thumbnail && (
                        <div className="aspect-video bg-muted overflow-hidden flex-shrink-0 relative">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            placeholder="empty"
                          />
                        </div>
                      )}
                      <Badge
                        className={`absolute top-2 right-2 ${
                          course.status === "published"
                            ? "bg-green-500/80 text-green-50 border border-green-500/50"
                            : "bg-yellow-500/80 text-yellow-50 border border-yellow-500/50"
                        }`}
                      >
                        {course.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="line-clamp-2 text-base sm:text-lg">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-xs sm:text-sm">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                      <div className="mb-4 space-y-1 text-xs sm:text-sm flex-1">
                        <div>
                          <span className="text-muted-foreground">
                            প্রশিক্ষক:{" "}
                          </span>
                          <span className="font-medium">
                            {course.instructor}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            বিভাগ:{" "}
                          </span>
                          <span className="font-medium">{course.category}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">মূল্য: </span>
                          <span className="font-medium">৳{course.price}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleReorderCourse(originalIndex, "up")
                          }
                          disabled={originalIndex === 0 || isReordering}
                          className="flex-1 min-w-max transition-all disabled:opacity-50"
                          title="Move up"
                          aria-label={`Move ${course.title} up`}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleReorderCourse(originalIndex, "down")
                          }
                          disabled={
                            originalIndex === courses.length - 1 ||
                            isReordering
                          }
                          className="flex-1 min-w-max transition-all disabled:opacity-50"
                          title="Move down"
                          aria-label={`Move ${course.title} down`}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1 min-w-max"
                          aria-label={`Edit ${course.title}`}
                        >
                          <Link href={`/admin/courses/${course.id}`}>
                            <Edit2 className="mr-1 h-3 w-3" />
                            <span className="hidden sm:inline">সম্পাদনা</span>
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1 min-w-max"
                          aria-label={`View ${course.title}`}
                        >
                          <Link
                            href={`/courses/${course.slug}`}
                            target="_blank"
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            <span className="hidden sm:inline">দেখুন</span>
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(course.id)}
                          className="flex-1 min-w-max"
                          aria-label={`Delete ${course.title}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm text-muted-foreground order-2 sm:order-1">
                  পৃষ্ঠা{" "}
                  <span className="font-semibold text-foreground">
                    {currentPage}
                  </span>{" "}
                  এর{" "}
                  <span className="font-semibold text-foreground">
                    {totalPages}
                  </span>{" "}
                  • {courses.length} মোট কোর্স
                </p>

                <div className="flex items-center gap-2 order-1 sm:order-2 overflow-x-auto pb-2 sm:pb-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    aria-label="পূর্ববর্তী পৃষ্ঠা"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">পূর্ববর্তী</span>
                  </Button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="min-w-10"
                          aria-current={
                            page === currentPage ? "page" : undefined
                          }
                          aria-label={`পৃষ্ঠা ${page}`}
                        >
                          {page}
                        </Button>
                      ),
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    aria-label="পরবর্তী পৃষ্ঠা"
                  >
                    <span className="hidden sm:inline">পরবর্তী</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </>
      )}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent className="w-[95vw] sm:w-full">
          <AlertDialogHeader>
            <AlertDialogTitle>কোর্স মুছুন</AlertDialogTitle>
            <AlertDialogDescription>
              আপনি কি এটি মুছতে চান?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 flex-col-reverse sm:flex-row">
            <AlertDialogCancel className="w-full">বাতিল করুন</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full"
            >
              মুছুন
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
