"use server";

import { BarChart3, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminStats } from "@/lib/stats";

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          ড্যাশবোর্ড
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2">
          সারসংক্ষেপ
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              মোট কোর্স
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {stats.totalCourses}
            </div>
            <p className="text-xs text-muted-foreground">কোর্স</p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              মোট মডিউল
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {stats.totalModules}
            </div>
            <p className="text-xs text-muted-foreground">মডিউল</p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              মোট পাঠ
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {stats.totalLessons}
            </div>
            <p className="text-xs text-muted-foreground">পাঠ</p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">দ্রুত লিঙ্ক</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm sm:text-base">
                কোর্স ব্যবস্থাপনা
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                নতুন কোর্স - কোর্স সম্পাদনা করুন - কোর্স মুছুন
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm sm:text-base">
                মডিউল ব্যবস্থাপনা
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                নতুন মডিউল - মডিউল সম্পাদনা করুন - মডিউল মুছুন
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm sm:text-base">
                পাঠ ব্যবস্থাপনা
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                নতুন পাঠ - পাঠ সম্পাদনা করুন - পাঠ মুছুন
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}