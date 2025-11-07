"use client";

import type * as React from "react";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Lesson, QuizQuestion } from "@/lib/types";

interface LessonPreviewProps {
  lesson: Lesson | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LessonPreview({
  lesson,
  open,
  onOpenChange,
}: LessonPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      cardRef.current?.focus();
    } else {
      cardRef.current?.blur();
    }
  }, [open]);

  if (!lesson) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onOpenChange(false);
    }
  };

  const renderPreview = () => {
    const contentStr =
      typeof lesson.content === "string"
        ? lesson.content
        : JSON.stringify(lesson.content || "[]");

    switch (lesson.lessonType) {
      case "video":
        return (
          <div className="space-y-4">
            <div className="bg-black aspect-video rounded-lg flex items-center justify-center overflow-hidden border border-border shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${contentStr}`}
                title={lesson.title}
                allowFullScreen
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Duration: {lesson.duration}
            </p>
          </div>
        );

      case "article":
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 rounded-lg p-6 space-y-4">
              <div
                className="prose prose-invert max-w-none"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: User-controlled HTML content from admin panel is intentional
                dangerouslySetInnerHTML={{ __html: contentStr }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Duration: {lesson.duration}
            </p>
          </div>
        );

      case "quiz":
        try {
          const questions = JSON.parse(contentStr) as QuizQuestion[];
          return (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-sm font-medium text-foreground">
                  Total Questions:{" "}
                  <span className="font-bold">{questions.length}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Showing first 3 questions
                </p>
              </div>
              <div className="space-y-4">
                {questions.slice(0, 3).map((q, idx) => (
                  <div
                    key={q.questionText}
                    className="border border-border rounded-lg p-4 space-y-3 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <Badge className="mt-0.5" variant="secondary">
                        Q{idx + 1}
                      </Badge>
                      <p className="font-medium leading-relaxed flex-1 text-foreground">
                        {q.questionText}
                      </p>
                    </div>
                    <div className="space-y-2 ml-8">
                      {q.options?.map((opt, optIdx) => (
                        <div
                          key={opt}
                          className={`p-3 rounded-md border-2 text-sm transition-all ${
                            optIdx === q.correctAnswer
                              ? "bg-green-500/10 border-green-500/80 text-green-700 dark:text-green-400"
                              : "bg-muted/30 border-border/50 text-foreground"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span>{opt}</span>
                            {optIdx === q.correctAnswer && (
                              <Badge className="bg-green-600/90 text-white text-xs">
                                ✓ Correct
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {questions.length > 3 && (
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <p className="text-xs text-muted-foreground text-center">
                    ... and <strong>{questions.length - 3}</strong> more
                    questions
                  </p>
                </div>
              )}
            </div>
          );
        } catch {
          return (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
              <p className="text-sm text-destructive font-medium">
                ⚠️ Invalid quiz content format
              </p>
            </div>
          );
        }

      default:
        return <p>Unknown lesson type</p>;
    }
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: Using a div for a dialog to avoid SSR issues with the native <dialog> element.
    <div
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
      onClick={() => onOpenChange(false)}
      className={`fixed inset-0 z-50 items-center justify-center p-4 animate-in fade-in duration-200 backdrop:bg-black/50 backdrop:animate-in backdrop:fade-in-0 ${
        open ? "flex" : "hidden"
      }`}
    >
      <Card
        ref={cardRef}
        tabIndex={-1}
        className="max-w-2xl w-full max-h-[80vh] overflow-auto animate-in zoom-in-95 fade-in duration-300 focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">
              {lesson.title}
            </h2>
            <Badge variant="outline" className="capitalize text-xs">
              {lesson.lessonType}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="hover:bg-muted/80 transition-colors"
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-6 space-y-6">{renderPreview()}</div>
      </Card>
    </div>
  );
}
