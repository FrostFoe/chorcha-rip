"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const leaderboard = [
  {
    avatar: "https://i.pravatar.cc/150?u=student1",
    name: "তাসপিয়া নাসরিন",
    college: "ঢাকা কলেজ",
  },
  {
    avatar: "https://i.pravatar.cc/150?u=student2",
    name: "ফারদিন ফাহিম",
    college: "রাজশাহী কলেজ",
  },
  {
    avatar: "https://i.pravatar.cc/150?u=student3",
    name: "মোঃ ফাহিম",
    college: "চট্টগ্রাম কলেজ",
  },
  {
    avatar: "https://i.pravatar.cc/150?u=student4",
    name: "ওয়ালিদ হাসান",
    college: "আনন্দ মোহন কলেজ",
  },
  {
    avatar: "https://i.pravatar.cc/150?u=student5",
    name: "আফরিন সুলতানা",
    college: "নটর ডেম কলেজ",
  },
  {
    avatar: "https://i.pravatar.cc/150?u=student6",
    name: "মেহেদি হাসান",
    college: "ভিক্টোরিয়া কলেজ",
  },
];

export default function LeaderboardPage() {
  const isMobile = useIsMobile();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const toggleSidebar = React.useCallback(
    () => setIsSidebarCollapsed((prev) => !prev),
    [],
  );

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-yellow-600";
    return "text-foreground";
  };

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
            ? "pt-16"
            : isSidebarCollapsed
              ? "lg:ml-sidebar-collapsed"
              : "lg:ml-sidebar-expanded",
        )}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              লিডারবোর্ড
            </h1>
            <p className="text-muted-foreground mt-2">
              সেরা শিক্ষার্থীদের মধ্যে আপনার অবস্থান দেখুন।
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>শীর্ষ শিক্ষার্থী</CardTitle>
              <CardDescription>
                সারাদেশের সেরা শিক্ষার্থীদের র‍্যাঙ্কিং
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">র‍্যাঙ্ক</TableHead>
                    <TableHead>নাম</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      শিক্ষা প্রতিষ্ঠান
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard.map((student, index) => (
                    <TableRow key={student.name}>
                      <TableCell
                        className={`text-xl font-bold ${getRankColor(
                          index + 1,
                        )}`}
                      >
                        #{index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={student.avatar}
                              alt={student.name}
                            />
                            <AvatarFallback>
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {student.college}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
