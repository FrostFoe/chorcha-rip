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
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";
import { useSupabase } from "@/app/supabase-provider";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const isMobile = useIsMobile();
  const { supabase } = useSupabase();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const toggleSidebar = React.useCallback(
    () => setIsSidebarCollapsed((prev) => !prev),
    [],
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
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
              <SettingsIcon className="w-8 h-8" />
              সেটিংস
            </h1>
            <p className="text-muted-foreground mt-2">
              আপনার অ্যাকাউন্ট সেটিংস পরিচালনা করুন।
            </p>
          </div>
          <div className="max-w-2xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>অ্যাকাউন্ট</CardTitle>
                <CardDescription>
                  আপনার অ্যাকাউন্ট সম্পর্কিত কার্যক্রম পরিচালনা করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" onClick={handleSignOut}>
                  সাইন আউট
                </Button>
              </CardContent>
            </Card>

            <Card className="border-destructive/50 bg-destructive/20 text-destructive-foreground">
              <CardHeader>
                <CardTitle>অ্যাকাউন্ট ডিলেট</CardTitle>
                <CardDescription className="text-destructive-foreground/80">
                  সতর্ক থাকুন! এই কাজটি স্থায়ী এবং এটি ফিরিয়ে আনা যাবে না।
                  আপনার সমস্ত ডেটা মুছে ফেলা হবে।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">
                  আমার অ্যাকাউন্ট ডিলেট করুন
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
