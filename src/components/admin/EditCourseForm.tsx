"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Copy,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Course, Module } from "@/lib/types";
import sanitizeHtml from "sanitize-html";

const categories = ["hsc", "ssc", "admission", "bcs"];

interface EditCourseFormProps {
  course: Course;
  allCourses: Course[];
}

export function EditCourseForm({
  course: initialCourse,
  allCourses: initialAllCourses,
}: EditCourseFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const courseId = initialCourse.id;

  const [isSaving, setIsSaving] = React.useState(false);
  const [isReordering, setIsReordering] = React.useState(false);
  const [course, setCourse] = React.useState<Course | null>(initialCourse);
  const [allCourses, setAllCourses] =
    React.useState<Course[]>(initialAllCourses);
  const [deleteModule, setDeleteModule] = React.useState<string | null>(null);
  const [deleteCourse, setDeleteCourse] = React.useState(false);
  const [cloneModule, setCloneModule] = React.useState<Module | null>(null);
  const [cloneTargetCourseId, setCloneTargetCourseId] = React.useState("");
  const [cloneNewModuleSlug, setCloneNewModuleSlug] = React.useState("");

  const handleCourseUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });

      if (response.ok) {
        toast({
          title: "সাফল্য",
          description: "কোর্স সফলভাবে আপডেট করা হয়েছে।",
        });
      } else {
        toast({
          title: "ত্রুটি",
          description: "কোর্স আপডেট করতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to update course:", error);
      toast({
        title: "ত্রুটি",
        description: "কোর্স আপডেট করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteModule = async (moduleSlug: string) => {
    try {
      const response = await fetch(
        `/api/admin/courses/${courseId}/modules/${moduleSlug}`,
        { method: "DELETE" },
      );
      if (response.ok && course?.modules) {
        setCourse({
          ...course,
          modules: course.modules.filter((m) => m.slug !== moduleSlug),
        });
        setDeleteModule(null);
        toast({
          title: "সাফল্য",
          description: "মডিউল সফলভাবে মুছে ফেলা হয়েছে।",
        });
      } else {
        toast({
          title: "ত্রুটি",
          description: "মডিউল মুছে ফেলতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to delete module:", error);
      toast({
        title: "ত্রুটি",
        description: "মডিউল মুছে ফেলতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    }
  };

  const handleReorderModule = async (
    currentIndex: number,
    direction: "up" | "down",
  ) => {
    if (!course?.modules) return;
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= course.modules.length) return;

    setIsReordering(true);
    try {
      const response = await fetch(
        `/api/admin/courses/${courseId}/modules/reorder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseId,
            fromIndex: currentIndex,
            toIndex: newIndex,
          }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        setCourse((prevCourse) => ({
          ...(prevCourse as Course),
          modules: data.modules,
        }));
        toast({
          title: "সাফল্য",
          description: `মডিউল ${
            direction === "up" ? "উপরে" : "নিচে"
          } সরানো হয়েছে।`,
        });
      } else {
        toast({
          title: "ত্রুটি",
          description: "মডিউলের ক্রম পরিবর্তন করতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to reorder module:", error);
      toast({
        title: "ত্রুটি",
        description: "মডিউলের ক্রম পরিবর্তন করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    } finally {
      setIsReordering(false);
    }
  };

  const handleDeleteCourse = async () => {
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "সাফল্য",
          description: "কোর্স সফলভাবে মুছে ফেলা হয়েছে।",
        });
        router.push("/admin/courses");
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

  const handleCloneModule = async () => {
    if (!cloneModule || !cloneTargetCourseId || !cloneNewModuleSlug.trim()) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/admin/courses/clone-module", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceCourseId: courseId,
          moduleSlugToClone: cloneModule.slug,
          targetCourseId: cloneTargetCourseId,
          newModuleSlug: cloneNewModuleSlug,
        }),
      });

      if (response.ok) {
        toast({
          title: "সাফল্য",
          description: "মডিউল সফলভাবে ক্লোন করা হয়েছে।",
        });
        setCloneModule(null);
      } else {
        const errorData = await response.json();
        toast({
          title: "ত্রুটি",
          description: errorData.error || "মডিউল ক্লোন করতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to clone module:", error);
      toast({
        title: "ত্রুটি",
        description: "মডিউল ক্লোন করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    }
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Course not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="ghost" asChild>
            <Link href="/admin/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Edit Course</h1>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  course.status === "published"
                    ? "bg-green-500/20 text-green-700 border border-green-500/50"
                    : "bg-yellow-500/20 text-yellow-700 border border-yellow-500/50"
                }`}
              >
                {course.status === "published" ? "Published" : "Draft"}
              </span>
            </div>
            <p className="text-muted-foreground mt-2">{course.title}</p>
          </div>
        </div>
        <Button variant="destructive" onClick={() => setDeleteCourse(true)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>Edit the course details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCourseUpdate} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={course.title}
                  onChange={(e) =>
                    setCourse({ ...course, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Course Slug</Label>
                <Input
                  id="slug"
                  value={course.slug}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={course.instructor}
                  onChange={(e) =>
                    setCourse({ ...course, instructor: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={course.category}
                  onValueChange={(value) =>
                    setCourse({
                      ...course,
                      category: value as Course["category"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={course.status || "draft"}
                  onValueChange={(value) =>
                    setCourse({
                      ...course,
                      status: value as "draft" | "published",
                      publishedAt:
                        value === "published"
                          ? new Date().toISOString()
                          : course.publishedAt,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Course Description (HTML + Tailwind)
              </Label>
              <Textarea
                id="description"
                placeholder="Enter HTML with Tailwind classes. Example:
<div class='space-y-4'>
  <p class='text-lg font-semibold text-primary'>Course Overview</p>
  <p class='text-muted-foreground'>Your course description here...</p>
  <div class='bg-blue-50 border-l-4 border-blue-500 p-4 rounded'>
    <p class='text-blue-900 font-semibold'>Key Points</p>
  </div>
</div>"
                value={course.description}
                onChange={(e) =>
                  setCourse({ ...course, description: e.target.value })
                }
                rows={8}
              />
              <p className="text-xs text-muted-foreground mt-2">
                This HTML content will be rendered on the course detail page
                with Tailwind styling support.
              </p>
              {course.description && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <div
                    className="prose prose-invert max-w-none text-sm"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(course.description),
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price (৳)</Label>
                <Input
                  id="price"
                  type="number"
                  value={course.price}
                  onChange={(e) =>
                    setCourse({
                      ...course,
                      price: Number.parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  type="url"
                  value={course.thumbnail}
                  onChange={(e) =>
                    setCourse({ ...course, thumbnail: e.target.value })
                  }
                />
                {course.thumbnail && (
                  <div className="space-y-2 mt-2">
                    <div className="bg-gradient-to-br from-muted to-muted-foreground/10 aspect-square border border-border rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={course.thumbnail}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover hover:opacity-95 transition-opacity"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.backgroundColor =
                            "hsl(var(--destructive))";
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      সর্বোত্তম: 200x200px
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Modules</CardTitle>
            <CardDescription>Manage course modules and lessons</CardDescription>
          </div>
          <Button asChild>
            <Link href={`/admin/courses/${courseId}/modules/new`}>
              <Plus className="mr-2 h-4 w-4" />
              New Module
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {!course.modules || course.modules.length === 0 ? (
            <p className="text-muted-foreground py-4">No modules yet</p>
          ) : (
            <div className="space-y-3">
              {course.modules.map((module, index) => (
                <div
                  key={module.slug}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border p-3 sm:p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                        {index + 1}
                      </span>
                      <h3 className="font-medium truncate">{module.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {module.lessons?.length || 0} lessons
                    </p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReorderModule(index, "up")}
                      disabled={index === 0 || isReordering}
                      className="flex-1 sm:flex-initial transition-all disabled:opacity-50"
                      title="Move up"
                      aria-label={`Move ${module.title} up`}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReorderModule(index, "down")}
                      disabled={
                        !course.modules ||
                        index === course.modules.length - 1 ||
                        isReordering
                      }
                      className="flex-1 sm:flex-initial transition-all disabled:opacity-50"
                      title="Move down"
                      aria-label={`Move ${module.title} down`}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCloneModule(module);
                        setCloneTargetCourseId("");
                        setCloneNewModuleSlug(`${module.slug}-copy`);
                      }}
                      className="flex-1 sm:flex-initial"
                      title="Clone module"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-initial"
                    >
                      <Link
                        href={`/admin/courses/${courseId}/modules/${module.slug}`}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteModule(module.slug)}
                      className="flex-1 sm:flex-initial"
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
        open={!!deleteModule}
        onOpenChange={(open) => !open && setDeleteModule(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Module</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this module? All lessons in this
              module will be deleted as well. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteModule && handleDeleteModule(deleteModule)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={deleteCourse}
        onOpenChange={(open) => !open && setDeleteCourse(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this entire course? This will
              delete all modules, lessons, and associated data. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCourse}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!cloneModule}
        onOpenChange={(open) => !open && setCloneModule(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clone Module</AlertDialogTitle>
            <AlertDialogDescription>
              Clone &quot;{cloneModule?.title}&quot; to another course.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="targetCourse">Target Course</Label>
              <Select
                value={cloneTargetCourseId}
                onValueChange={setCloneTargetCourseId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {allCourses
                    .filter((c) => c.id !== courseId)
                    .map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newModuleSlug">New Module Slug</Label>
              <Input
                id="newModuleSlug"
                value={cloneNewModuleSlug}
                onChange={(e) => setCloneNewModuleSlug(e.target.value)}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCloneModule}>
              <Copy className="mr-2 h-4 w-4" /> Clone
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
