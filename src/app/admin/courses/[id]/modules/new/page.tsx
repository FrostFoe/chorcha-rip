"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import type { Module } from "@/lib/types";

export default function NewModulePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const courseId = params.id as string;

  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<Partial<Module>>({
    title: "",
    slug: "",
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

    if (!formData.title || !formData.slug) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে প্রয়োজনীয় সকল ফিল্ড পূরণ করুন।",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/courses/${courseId}/modules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const module = await response.json();
        toast({
          title: "সাফল্য",
          description: "মডিউল সফলভাবে তৈরি করা হয়েছে।",
        });
        router.push(`/admin/courses/${courseId}/modules/${module.slug}`);
      } else {
        toast({
          title: "ত্রুটি",
          description: "মডিউল তৈরি করতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to create module:", error);
      toast({
        title: "ত্রুটি",
        description: "মডিউল তৈরি করতে ব্যর্থ হয়েছে।",
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
          <Link href={`/admin/courses/${courseId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create New Module
          </h1>
          <p className="text-muted-foreground mt-2">
            Add a new module to your course
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Module Information</CardTitle>
          <CardDescription>
            Enter the basic details about your module
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Module Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Vectors and Motion"
                value={formData.title}
                onChange={handleTitleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">
                Module Slug <span className="text-red-500">*</span>
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

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Module"
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href={`/admin/courses/${courseId}`}>Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
