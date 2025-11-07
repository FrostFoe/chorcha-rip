"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import type { Module, Lesson } from "@/lib/types";

interface EditModuleFormProps {
  courseId: string;
  initialModule: Module;
}

export function EditModuleForm({
  courseId,
  initialModule,
}: EditModuleFormProps) {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const moduleSlug = params.moduleSlug as string;

  const [isSaving, setIsSaving] = React.useState(false);
  const [isReordering, setIsReordering] = React.useState(false);
  const [module, setModule] = React.useState<Module | null>(initialModule);
  const [deleteLesson, setDeleteLesson] = React.useState<string | null>(null);

  const handleModuleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!module) return;

    try {
      setIsSaving(true);
      const response = await fetch(
        `/api/admin/courses/${courseId}/modules/${moduleSlug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(module),
        },
      );

      if (response.ok) {
        toast({
          title: "সাফল্য",
          description: "মডিউল সফলভাবে আপডেট করা হয়েছে।",
        });
      } else {
        toast({
          title: "ত্রুটি",
          description: "মডিউল আপডেট করতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to update module:", error);
      toast({
        title: "ত্রুটি",
        description: "মডিউল আপডেট করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLesson = async (lessonSlug: string) => {
    try {
      const response = await fetch(
        `/api/admin/courses/${courseId}/modules/${moduleSlug}/lessons/${lessonSlug}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        if (module) {
          setModule({
            ...module,
            lessons: module.lessons?.filter((l) => l.slug !== lessonSlug) || [],
          });
        }
        setDeleteLesson(null);
        toast({
          title: "সাফল্য",
          description: "পাঠ সফলভাবে মুছে ফেলা হয়েছে।",
        });
      } else {
        toast({
          title: "ত্রুটি",
          description: "পাঠ মুছে ফেলতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to delete lesson:", error);
      toast({
        title: "ত্রুটি",
        description: "পাঠ মুছে ফেলতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    }
  };

  const handleReorderLesson = async (
    currentIndex: number,
    direction: "up" | "down",
  ) => {
    if (!module || !module.lessons) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= module.lessons.length) return;

    try {
      setIsReordering(true);
      const response = await fetch(
        `/api/admin/courses/${courseId}/modules/${moduleSlug}/lessons/reorder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseId,
            moduleSlug,
            fromIndex: currentIndex,
            toIndex: newIndex,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        setModule(data.module);
        toast({
          title: "সাফল্য",
          description: `পাঠ ${direction === "up" ? "উপরে" : "নিচে"} সরানো হয়েছে।`,
        });
      } else {
        toast({
          title: "ত্রুটি",
          description: "পাঠের ক্রম পরিবর্তন করতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to reorder lesson:", error);
      toast({
        title: "ত্রুটি",
        description: "পাঠের ক্রম পরিবর্তন করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    } finally {
      setIsReordering(false);
    }
  };

  if (!module) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <Button variant="ghost" asChild size="sm">
          <Link href={`/admin/courses/${courseId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            ফিরে যান
          </Link>
        </Button>
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">ডেটা লোড করতে ব্যর্থ</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button variant="ghost" asChild size="sm">
          <Link href={`/admin/courses/${courseId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            ফিরে যান
          </Link>
        </Button>
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            মডিউল সম্পাদনা করুন
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 truncate">
            {module.title}
          </p>
        </div>
      </div>

      {/* Module Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">মডিউল তথ্য</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            মডিউল সম্পাদনা করুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleModuleUpdate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm">
                মডিউলের নাম
              </Label>
              <Input
                id="title"
                value={module.title}
                onChange={(e) =>
                  setModule({ ...module, title: e.target.value })
                }
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm">
                মডিউল স্লাগ
              </Label>
              <Input
                id="slug"
                value={module.slug}
                readOnly
                className="bg-muted text-sm"
              />
            </div>

            <div className="flex gap-3 pt-4 flex-col-reverse sm:flex-row">
              <Button type="submit" disabled={isSaving} size="sm">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    সংরক্ষণ করছে...
                  </>
                ) : (
                  "সংরক্ষণ করুন"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Lessons Section */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <CardTitle className="text-lg sm:text-xl">
              পাঠ ব্যবস্থাপনা
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              নতুন পাঠ তৈরি করুন
            </CardDescription>
          </div>
          <Button asChild size="sm" className="w-full sm:w-auto">
            <Link
              href={`/admin/courses/${courseId}/modules/${moduleSlug}/lessons/new`}
            >
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">নতুন পাঠ</span>
              <span className="sm:hidden">যোগ করুন</span>
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {!module.lessons || module.lessons.length === 0 ? (
            <p className="text-xs sm:text-sm text-muted-foreground py-4">
              কোনো পাঠ পাওয়া যায়নি
            </p>
          ) : (
            <div className="space-y-3">
              {module.lessons.map((lesson, index) => (
                <div
                  key={lesson.slug}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-3 sm:p-4 transition-all hover:border-primary/50 hover:shadow-sm bg-card"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                        {index + 1}
                      </span>
                      <h3 className="font-medium text-sm sm:text-base truncate">
                        {lesson.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {lesson.lessonType} • {lesson.duration}
                    </p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReorderLesson(index, "up")}
                      disabled={index === 0 || isReordering}
                      className="flex-1 sm:flex-initial transition-all disabled:opacity-50"
                      title="Move up"
                      aria-label={`Move ${lesson.title} up`}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReorderLesson(index, "down")}
                      disabled={
                        index === (module.lessons?.length || 0) - 1 ||
                        isReordering
                      }
                      className="flex-1 sm:flex-initial transition-all disabled:opacity-50"
                      title="Move down"
                      aria-label={`Move ${lesson.title} down`}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-initial transition-colors hover:bg-blue-50 dark:hover:bg-blue-950"
                    >
                      <Link
                        href={`/admin/courses/${courseId}/modules/${moduleSlug}/lessons/${lesson.slug}`}
                        title="Edit lesson"
                        aria-label={`Edit ${lesson.title}`}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteLesson(lesson.slug)}
                      className="flex-1 sm:flex-initial transition-all"
                      title="Delete lesson"
                      aria-label={`Delete ${lesson.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={!!deleteLesson}
        onOpenChange={(open) => !open && setDeleteLesson(null)}
      >
        <AlertDialogContent className="w-[95vw] sm:w-full">
          <AlertDialogHeader>
            <AlertDialogTitle>পাঠ মুছুন</AlertDialogTitle>
            <AlertDialogDescription>
              আপনি কি এটি মুছতে চান?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 flex-col-reverse sm:flex-row">
            <AlertDialogCancel className="w-full">বাতিল করুন</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteLesson && handleDeleteLesson(deleteLesson)}
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
