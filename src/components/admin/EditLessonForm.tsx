"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Eye, Copy } from "lucide-react";
import Link from "next/link";
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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { useToast } from "@/hooks/use-toast";
import { LessonPreview } from "@/components/admin/LessonPreview";
import { CodeBlockEditor } from "@/components/admin/CodeBlockEditor";
import { TableEditor } from "@/components/admin/TableEditor";
import type { Lesson, LessonType } from "@/lib/types";

interface QuizQuestion {
  questionText: string;
  options: string[];
  correctAnswer: number;
}

const lessonTypes: LessonType[] = ["video", "article", "quiz"];

interface EditLessonFormProps {
  courseId: string;
  moduleSlug: string;
  initialLesson: Lesson;
  modules: string[];
}

export function EditLessonForm({
  courseId,
  moduleSlug,
  initialLesson,
  modules,
}: EditLessonFormProps) {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const lessonSlug = params.lessonSlug as string;

  const [isSaving, setIsSaving] = React.useState(false);
  const [lesson, setLesson] = React.useState<Lesson | null>(initialLesson);
  const [showPreview, setShowPreview] = React.useState(false);
  const [showCloneModal, setShowCloneModal] = React.useState(false);
  const [showCodeBlock, setShowCodeBlock] = React.useState(false);
  const [showTableEditor, setShowTableEditor] = React.useState(false);
  const [cloneNewSlug, setCloneNewSlug] = React.useState("");
  const [cloneTargetModule, setCloneTargetModule] = React.useState(moduleSlug);

  const handleCloneLesson = async () => {
    if (!cloneNewSlug.trim()) {
      toast({
        title: "ত্রুটি",
        description: "ক্লোন করা পাঠের জন্য একটি স্লাগ লিখুন।",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/courses/${courseId}/modules/${moduleSlug}/lessons/clone`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseId,
            moduleSlug,
            lessonSlug,
            newLessonSlug: cloneNewSlug,
            targetModuleSlug: cloneTargetModule,
          }),
        },
      );

      if (response.ok) {
        toast({
          title: "সাফল্য",
          description: "পাঠ সফলভাবে ক্লোন করা হয়েছে।",
        });
        setShowCloneModal(false);
        setCloneNewSlug("");
      } else {
        toast({
          title: "ত্রুটি",
          description: "পাঠ ক্লোন করতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to clone lesson:", error);
      toast({
        title: "ত্রুটি",
        description: "পাঠ ক্লোন করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!lesson) return;

    const { name, value } = e.target;
    setLesson((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSelectChange = (value: string) => {
    if (!lesson) return;

    const demoQuestions = [
      {
        questionText: "What is the main topic of this chapter?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: 0,
      },
      {
        questionText: "Which of the following is correct?",
        options: ["Choice A", "Choice B", "Choice C", "Choice D"],
        correctAnswer: 1,
      },
    ];

    setLesson((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        lessonType: value as LessonType,
        content:
          value === "quiz"
            ? JSON.stringify(demoQuestions, null, 2)
            : prev.content,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lesson) return;

    try {
      setIsSaving(true);
      const response = await fetch(
        `/api/admin/courses/${courseId}/modules/${moduleSlug}/lessons/${lessonSlug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lesson),
        },
      );

      if (response.ok) {
        toast({
          title: "সাফল্য",
          description: "পাঠ সফলভাবে আপডেট করা হয়েছে।",
        });
      } else {
        toast({
          title: "ত্রুটি",
          description: "পাঠ আপডেট করতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to update lesson:", error);
      toast({
        title: "ত্রুটি",
        description: "পাঠ আপডেট করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!lesson) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href={`/admin/courses/${courseId}/modules/${moduleSlug}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">Lesson not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href={`/admin/courses/${courseId}/modules/${moduleSlug}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Lesson</h1>
            <p className="text-muted-foreground mt-2">{lesson.title}</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowCloneModal(true)}
          type="button"
        >
          <Copy className="mr-2 h-4 w-4" />
          Clone
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Information</CardTitle>
          <CardDescription>Edit the lesson details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Lesson Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={lesson.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Lesson Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={lesson.slug}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lessonType">Lesson Type</Label>
                <Select
                  value={lesson.lessonType}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lessonTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={lesson.duration}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder={
                  lesson.lessonType === "video"
                    ? "YouTube Video ID (e.g., dQw4w9WgXcQ)"
                    : lesson.lessonType === "article"
                      ? 'HTML with Tailwind classes:\n\n<h1 class="text-3xl font-bold text-blue-600 mb-4">Title</h1>\n<p class="text-lg">Content here...</p>\n<div class="bg-gray-100 p-4 rounded-lg my-4">Box content</div>'
                      : "JSON formatted quiz questions"
                }
                value={
                  typeof lesson.content === "string"
                    ? lesson.content
                    : JSON.stringify(lesson.content)
                }
                onChange={handleInputChange}
                rows={lesson.lessonType === "article" ? 12 : 6}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                {lesson.lessonType === "video"
                  ? "For video lessons, enter the YouTube Video ID (the part after 'v=' in the URL)"
                  : lesson.lessonType === "article"
                    ? 'For articles, enter HTML with Tailwind classes or inline styles. Example: <h1 class="text-3xl font-bold text-blue-600">Title</h1>'
                    : 'For quizzes, enter quiz questions as JSON: [{"questionText": "...", "options": [...], "correctAnswer": 0}]'}
              </p>

              {lesson.lessonType === "article" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCodeBlock(!showCodeBlock)}
                    >
                      {showCodeBlock ? "Hide" : "Show"} Code Block
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTableEditor(!showTableEditor)}
                    >
                      {showTableEditor ? "Hide" : "Show"} Table Editor
                    </Button>
                  </div>

                  {showCodeBlock && (
                    <CodeBlockEditor
                      onInsert={(html) => {
                        const currentContent =
                          typeof lesson.content === "string"
                            ? lesson.content
                            : "";
                        setLesson({
                          ...lesson,
                          content: currentContent + html,
                        });
                        setShowCodeBlock(false);
                      }}
                    />
                  )}

                  {showTableEditor && (
                    <TableEditor
                      onInsert={(html) => {
                        const currentContent =
                          typeof lesson.content === "string"
                            ? lesson.content
                            : "";
                        setLesson({
                          ...lesson,
                          content: currentContent + html,
                        });
                        setShowTableEditor(false);
                      }}
                    />
                  )}
                </div>
              )}

              {lesson.lessonType === "video" && lesson.content && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm font-medium mb-2">Video Preview:</p>
                  <div className="bg-black aspect-video rounded-lg flex items-center justify-center overflow-hidden border border-border">
                    <iframe
                      src={`https://www.youtube.com/embed/${lesson.content}`}
                      title={lesson.title}
                      allowFullScreen
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </div>
              )}

              {lesson.lessonType === "article" && lesson.content && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm font-medium mb-2">Article Preview:</p>
                  <div
                    className="prose prose-invert max-w-none text-sm"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: User-controlled HTML content from admin panel is intentional
                    dangerouslySetInnerHTML={{
                      __html: lesson.content as string,
                    }}
                  />
                </div>
              )}

              {lesson.lessonType === "quiz" && lesson.content && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm font-medium mb-2">
                    Quiz Preview (First 3 Questions):
                  </p>
                  {(() => {
                    try {
                      const contentStr =
                        typeof lesson.content === "string"
                          ? lesson.content
                          : JSON.stringify(lesson.content);
                      const questions: QuizQuestion[] = JSON.parse(contentStr);
                      return (
                        <div className="space-y-3">
                          {questions
                            .slice(0, 3)
                            .map((q: QuizQuestion, idx: number) => (
                              <div
                                key={q.questionText}
                                className="border border-border/50 rounded-lg p-3 space-y-2 bg-background/50"
                              >
                                <div className="flex items-start gap-2">
                                  <span className="text-xs font-semibold text-primary mt-0.5">
                                    Q{idx + 1}
                                  </span>
                                  <p className="text-sm font-medium flex-1">
                                    {q.questionText}
                                  </p>
                                </div>
                                <div className="space-y-1 ml-6">
                                  {q.options?.map(
                                    (opt: string, optIdx: number) => (
                                      <div
                                        key={opt}
                                        className={`text-xs p-2 rounded ${
                                          optIdx === q.correctAnswer
                                            ? "bg-green-500/20 text-green-700 border border-green-500/50"
                                            : "bg-muted/50"
                                        }`}
                                      >
                                        {optIdx === q.correctAnswer && (
                                          <span className="font-bold">✓ </span>
                                        )}
                                        {opt}
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            ))}
                          {questions.length > 3 && (
                            <p className="text-xs text-muted-foreground text-center py-2">
                              ... and <strong>{questions.length - 3}</strong>{" "}
                              more questions
                            </p>
                          )}
                        </div>
                      );
                    } catch {
                      return (
                        <p className="text-sm text-destructive">
                          ⚠️ Invalid JSON format
                        </p>
                      );
                    }
                  })()}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPreview(true)}
                disabled={!lesson}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
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

      <LessonPreview
        lesson={lesson}
        open={showPreview}
        onOpenChange={setShowPreview}
      />

      <AlertDialog
        open={showCloneModal}
        onOpenChange={(open) => {
          setShowCloneModal(open);
          if (!open) {
            setCloneNewSlug("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clone Lesson</AlertDialogTitle>
            <AlertDialogDescription>
              Create a copy of this lesson. You can move it to a different
              module.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cloneSlug">New Lesson Slug</Label>
              <Input
                id="cloneSlug"
                placeholder="e.g., lesson-copy"
                value={cloneNewSlug}
                onChange={(e) => setCloneNewSlug(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetModule">Target Module</Label>
              <Select
                value={cloneTargetModule}
                onValueChange={setCloneTargetModule}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((mod) => (
                    <SelectItem key={mod} value={mod}>
                      {mod}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCloneLesson}>
              <Copy className="mr-2 h-4 w-4" />
              Clone
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
