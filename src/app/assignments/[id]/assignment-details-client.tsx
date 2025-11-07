"use client";

import { useParams, useRouter } from "next/navigation";
import { useSupabase } from "@/app/supabase-provider";
import * as React from "react";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, FilePenLine, Paperclip, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Assignment } from "@/lib/types";
import { useUserData } from "@/providers/UserDataProvider";
import { DesignedButton } from "@/components/ui/DesignedButton";

interface AssignmentDetailsClientProps {
  assignment: Assignment;
}

export function AssignmentDetailsClient({
  assignment: initialAssignment,
}: AssignmentDetailsClientProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { session } = useSupabase();
  const { toast } = useToast();
  const { isAssignmentSubmitted, submitAssignment } = useUserData();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isSubmitted = session?.user
    ? isAssignmentSubmitted(initialAssignment.id)
    : false;

  const assignment = {
    ...initialAssignment,
    status: isSubmitted ? "Submitted" : "Pending",
  };

  const toggleSidebar = React.useCallback(
    () => setIsSidebarCollapsed((prev) => !prev),
    [],
  );

  const handleFileChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.[0]) {
        setSelectedFile(event.target.files[0]);
      }
    },
    [],
  );

  const handleSubmit = React.useCallback(() => {
    if (!selectedFile || !session?.user || !assignment?.id) return;

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      submitAssignment(assignment.id);

      toast({
        title: "সাফল্য",
        description: `"${assignment.title}" অ্যাসাইনমেন্টটি সফলভাবে জমা দেওয়া হয়েছে।`,
      });
      setIsSubmitting(false);
      router.push("/assignments");
    }, 1000);
  }, [selectedFile, session, assignment, toast, router, submitAssignment]);

  if (!assignment) {
    // You can render a loader here while the assignment is being fetched
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

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
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link
                href="/assignments"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>সব অ্যাসাইনমেন্টে ফিরে যান</span>
              </Link>
            </Button>
          </div>
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <FilePenLine className="w-7 h-7" />
                    {assignment.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    কোর্স: {assignment.courseName}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    assignment.status === "Submitted" ? "default" : "secondary"
                  }
                  className={
                    assignment.status === "Submitted"
                      ? "bg-primary/20 text-primary border-primary/30"
                      : "bg-secondary/80 text-secondary-foreground border-border"
                  }
                >
                  {assignment.status === "Submitted"
                    ? "জমা দেওয়া হয়েছে"
                    : "অমীমাংসিত"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">নির্দেশনা</h3>
                <p className="text-muted-foreground prose prose-sm">
                  অ্যাসাইনমেন্টটি সম্পন্ন করে একটি PDF ফাইল আকারে আপলোড করুন।
                  ফাইলের নাম আপনার রোল নম্বর দিয়ে শুরু করতে হবে। যেমন:
                  `12345_assignment.pdf`
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">জমাদানের শেষ তারিখ</h3>
                <p className="text-muted-foreground">{assignment.dueDate}</p>
              </div>
            </CardContent>
            {assignment.status !== "Submitted" && (
              <CardFooter className="flex-col items-start gap-4">
                <div className="w-full space-y-2">
                  <label htmlFor="file-upload" className="font-semibold">
                    ফাইল আপলোড করুন
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      className="file:text-primary file:font-semibold"
                      disabled={isSubmitting}
                    />
                  </div>
                  {selectedFile && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Paperclip className="h-4 w-4" />
                      <span>{selectedFile.name}</span>
                    </div>
                  )}
                </div>
                <DesignedButton
                  onClick={handleSubmit}
                  disabled={!selectedFile || isSubmitting}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isSubmitting ? "জমা দেওয়া হচ্ছে..." : "জমা দিন"}
                </DesignedButton>
              </CardFooter>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
