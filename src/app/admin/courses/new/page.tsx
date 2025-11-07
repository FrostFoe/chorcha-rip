"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Course } from "@/lib/types";

const categories = ["hsc", "ssc", "admission", "bcs"];

export default function NewCoursePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<Partial<Course>>({
    title: "",
    slug: "",
    description: "",
    instructor: "",
    category: "hsc",
    price: 0,
    thumbnail: "",
    body: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number.parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value as Course["category"],
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

    if (!formData.title || !formData.instructor || !formData.description) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে প্রয়োজনীয় সকল ফিল্ড পূরণ করুন।",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const course = await response.json();
        toast({
          title: "সাফল্য",
          description: "কোর্স সফলভাবে তৈরি করা হয়েছে।",
        });
        router.push(`/admin/courses/${course.id}`);
      } else {
        toast({
          title: "ত্রুটি",
          description: "কোর্স তৈরি করতে ব্যর্থ হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to create course:", error);
      toast({
        title: "ত্রুটি",
        description: "কোর্স তৈরি করতে ব্যর্থ হয়েছে।",
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
          <Link href="/admin/courses">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create New Course
          </h1>
          <p className="text-muted-foreground mt-2">
            Add a new course to your platform
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>
            Enter the basic details about your course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Course Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., HSC Physics 1st Paper"
                  value={formData.title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">
                  Course Slug <span className="text-red-500">*</span>
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
                <Label htmlFor="instructor">
                  Instructor <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="instructor"
                  name="instructor"
                  placeholder="e.g., Dr. Anisul Haque"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger aria-label="Select course category">
                    <SelectValue placeholder="Select category" />
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Course Description (HTML + Tailwind){" "}
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter HTML with Tailwind classes. Example:
<div class='space-y-4'>
  <p class='text-lg font-semibold text-primary'>Course Overview</p>
  <p class='text-muted-foreground'>Your course description here...</p>
  <div class='bg-blue-50 border-l-4 border-blue-500 p-4 rounded'>
    <p class='text-blue-900 font-semibold'>Key Points</p>
  </div>
</div>"
                value={formData.description}
                onChange={handleInputChange}
                rows={8}
                required
              />
              <p className="text-xs text-muted-foreground mt-2">
                This HTML content will be rendered on the course detail page
                with Tailwind styling support.
              </p>
              {formData.description && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <div
                    className="prose prose-invert max-w-none text-sm"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: User-controlled HTML content from admin panel is intentional
                    dangerouslySetInnerHTML={{ __html: formData.description }}
                  />
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price (৳) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  type="url"
                  placeholder="https://..."
                  value={formData.thumbnail}
                  onChange={handleInputChange}
                />
                {formData.thumbnail && (
                  <div className="mt-2 rounded-lg overflow-hidden bg-gradient-to-br from-muted to-muted-foreground/10 aspect-video flex items-center justify-center border border-border">
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover hover:opacity-95 transition-opacity"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = "none";
                        img.parentElement?.classList.add("bg-destructive/5");
                      }}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Course"
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/courses">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
