"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Eye } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { LessonPreview } from "@/components/admin/LessonPreview";
import type { Lesson, LessonType } from "@/lib/types";

interface QuizQuestion {
  questionText: string;
  options: string[];
  correctAnswer: number;
}

const lessonTypes: LessonType[] = ["video", "article", "quiz"];

export default function NewLessonPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const courseId = params.id as string;
  const moduleSlug = params.moduleSlug as string;

  const [isLoading, setIsLoading] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  const [formData, setFormData] = React.useState<Partial<Lesson>>({
    title: "",
    slug: "",
    duration: "5 minutes",
    lessonType: "video",
    content: "",
    completed: false,
    module: moduleSlug,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
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

    setFormData((prev) => ({
      ...prev,
      lessonType: value as LessonType,
      content: value === "quiz" ? JSON.stringify(demoQuestions, null, 2) : "",
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug || !formData.content) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে প্রয়োজনীয় সকল ফিল্ড পূরণ করুন।",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/admin/courses/${courseId}/modules/${moduleSlug}/lessons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const lesson = await response.json();
        toast({
          title: "সাফল্য",
          description: "পাঠ সফলভাবে তৈরি করা হয়েছে।",
        });
        router.push(
          `/admin/courses/${courseId}/modules/${moduleSlug}/lessons/${lesson.slug}`,
        );
      } else {
        toast({
          title: "ত্রুটি",
          description: "পাঠ তৈরি করতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to create lesson:", error);
      toast({
        title: "ত্রুটি",
        description: "পাঠ তৈরি করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href={`/admin/courses/${courseId}/modules/${moduleSlug}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create New Lesson
          </h1>
          <p className="text-muted-foreground mt-2">
            Add a new lesson to your module
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Information</CardTitle>
          <CardDescription>
            Enter the basic details about your lesson
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Lesson Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Introduction to Vectors"
                  value={formData.title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">
                  Lesson Slug <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="Auto-generated"
                  value={formData.slug}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lessonType">
                  Lesson Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.lessonType}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select lesson type" />
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
                  placeholder="e.g., 15 minutes"
                  value={formData.duration}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">
                Content <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder={
                  formData.lessonType === "video"
                    ? "YouTube Video ID (e.g., dQw4w9WgXcQ)"
                    : formData.lessonType === "article"
                      ? 'HTML with Tailwind classes:\n\n<h1 class="text-3xl font-bold text-blue-600 mb-4">Title</h1>\n<p class="text-lg">Content here...</p>\n<div class="bg-gray-100 p-4 rounded-lg my-4">Box content</div>'
                      : "JSON formatted quiz questions"
                }
                value={
                  typeof formData.content === "string"
                    ? formData.content
                    : JSON.stringify(formData.content || [])
                }
                onChange={handleInputChange}
                rows={formData.lessonType === "article" ? 12 : 6}
                required
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                {formData.lessonType === "video"
                  ? "For video lessons, enter the YouTube Video ID (the part after 'v=' in the URL)"
                  : formData.lessonType === "article"
                    ? 'For articles, enter HTML with Tailwind classes or inline styles. Example: <h1 class="text-3xl font-bold text-blue-600">Title</h1>'
                    : 'For quizzes, enter quiz questions as JSON: [{"questionText": "...", "options": [...], "correctAnswer": 0}]'}
              </p>

              {formData.lessonType === "video" && formData.content && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm font-medium mb-2">Video Preview:</p>
                  <div className="bg-black aspect-video rounded-lg flex items-center justify-center overflow-hidden border border-border">
                    <iframe
                      src={`https://www.youtube.com/embed/${formData.content}`}
                      title={formData.title}
                      allowFullScreen
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </div>
              )}

              {formData.lessonType === "article" && formData.content && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm font-medium mb-2">Article Preview:</p>
                  <div
                    className="prose prose-invert max-w-none text-sm"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: User-controlled HTML content from admin panel is intentional
                    dangerouslySetInnerHTML={{
                      __html: formData.content as string,
                    }}
                  />
                </div>
              )}

              {formData.lessonType === "quiz" && formData.content && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm font-medium mb-2">
                    Quiz Preview (First 3 Questions):
                  </p>
                  {(() => {
                    try {
                      const contentStr =
                        typeof formData.content === "string"
                          ? formData.content
                          : JSON.stringify(formData.content);
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
                disabled={!formData.title || !formData.content}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Lesson"
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href={`/admin/courses/${courseId}/modules/${moduleSlug}`}>
                  Cancel
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <LessonPreview
        lesson={formData as unknown as Lesson}
        open={showPreview}
        onOpenChange={setShowPreview}
      />
    </div>
  );
}
