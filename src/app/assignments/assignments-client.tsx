"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilePenLine } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSupabase } from "../supabase-provider";
import type { Assignment } from "@/lib/types";
import { useUserData } from "@/providers/UserDataProvider";

interface AssignmentsClientProps {
  staticAssignments: Assignment[];
}

export function AssignmentsClient({
  staticAssignments,
}: AssignmentsClientProps) {
  const isMobile = useIsMobile();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const { session } = useSupabase();
  const { isAssignmentSubmitted } = useUserData();

  const toggleSidebar = React.useCallback(
    () => setIsSidebarCollapsed((prev) => !prev),
    [],
  );

  const assignments = React.useMemo(() => {
    if (!session?.user) {
      return staticAssignments.map((assignment) => ({
        ...assignment,
        status: assignment.status ?? "Pending",
      }));
    }

    return staticAssignments.map((assignment) => {
      const isSubmitted = isAssignmentSubmitted(assignment.id);
      return {
        ...assignment,
        status: isSubmitted ? "Submitted" : "Pending",
      };
    });
  }, [session, staticAssignments, isAssignmentSubmitted]);

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
              <FilePenLine className="w-8 h-8" />
              অ্যাসাইনমেন্ট
            </h1>
            <p className="text-muted-foreground mt-2">
              আপনার সকল অমীমাংসিত এবং জমাকৃত অ্যাসাইনমেন্ট দেখুন।
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>আমার অ্যাসাইনমেন্ট</CardTitle>
              <CardDescription>
                আপনার সকল অ্যাসাইনমেন্টের তালিকা নিচে দেওয়া হলো।
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Responsive container */}
              <div>
                {/* Desktop Table */}
                <div className="hidden sm:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>অ্যাসাইনমেন্ট</TableHead>
                        <TableHead>কোর্স</TableHead>
                        <TableHead>জমাদানের তারিখ</TableHead>
                        <TableHead>স্ট্যাটাস</TableHead>
                        <TableHead />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">
                            {assignment.title}
                          </TableCell>
                          <TableCell>{assignment.courseName}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                assignment.status === "Submitted"
                                  ? "default"
                                  : "secondary"
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
                          </TableCell>
                          <TableCell className="text-right">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/assignments/${assignment.id}`}>
                                বিস্তারিত দেখুন
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card List */}
                <div className="block sm:hidden">
                  <div className="space-y-4">
                    {assignments.map((assignment) => (
                      <Card
                        key={assignment.id}
                        className="overflow-hidden border"
                      >
                        <CardContent className="p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-base leading-tight">
                              {assignment.title}
                            </h3>
                            <Badge
                              variant={
                                assignment.status === "Submitted"
                                  ? "default"
                                  : "secondary"
                              }
                              className={cn(
                                "text-xs shrink-0",
                                assignment.status === "Submitted"
                                  ? "bg-primary/20 text-primary border-primary/30"
                                  : "bg-secondary/80 text-secondary-foreground border-border",
                              )}
                            >
                              {assignment.status === "Submitted"
                                ? "জমা হয়েছে"
                                : "অমীমাংসিত"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>
                              <strong>কোর্স:</strong> {assignment.courseName}
                            </p>
                            <p>
                              <strong>জমাদানের তারিখ:</strong>{" "}
                              {assignment.dueDate}
                            </p>
                          </div>
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Link href={`/assignments/${assignment.id}`}>
                              অ্যাসাইনমেন্ট দেখুন
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
