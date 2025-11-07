"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { WeeklyPointsChart } from "@/components/profile/WeeklyPointsChart";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { Sidebar } from "@/components/dashboard/Sidebar";
import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSupabase } from "@/app/supabase-provider";
import { useRouter } from "next/navigation";
import { useUserData } from "@/providers/UserDataProvider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const isMobile = useIsMobile();
  const { supabase } = useSupabase();
  const router = useRouter();
  const { profile, updateProfile } = useUserData();
  const { toast } = useToast();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [formData, setFormData] = React.useState({
    full_name: "",
    avatar_url: "",
  });
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        avatar_url: profile.avatar_url || "",
      });
    }
  }, [profile]);

  const toggleSidebar = React.useCallback(
    () => setIsSidebarCollapsed((prev) => !prev),
    [],
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(formData);
      toast({
        title: "সাফল্য",
        description: "আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে।",
      });
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
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
            ? ""
            : isSidebarCollapsed
              ? "lg:ml-sidebar-collapsed"
              : "lg:ml-sidebar-expanded",
        )}
      >
        <div className="container mx-auto max-w-4xl">
          <ProfileHeader />
          <div className="grid grid-cols-1 gap-6 items-start mt-6">
            <Card>
              <CardHeader>
                <CardTitle>সাপ্তাহিক অগ্রগতি</CardTitle>
              </CardHeader>
              <CardContent>
                <WeeklyPointsChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>সেটিংস</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <CardDescription>
                  আপনার প্রোফাইলের তথ্য পরিবর্তন করুন।
                </CardDescription>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">আপনার নাম</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar_url">প্রোফাইল ছবির URL</Label>
                    <Input
                      id="avatar_url"
                      name="avatar_url"
                      type="url"
                      value={formData.avatar_url}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        সংরক্ষণ করছে...
                      </>
                    ) : (
                      "সংরক্ষণ করুন"
                    )}
                  </Button>
                </form>
              </CardContent>

              <div className="border-t p-6 space-y-6">
                <CardDescription>
                  আপনার অ্যাকাউন্ট সম্পর্কিত কার্যক্রম পরিচালনা করুন।
                </CardDescription>
                <Button variant="destructive" onClick={handleSignOut}>
                  সাইন আউট
                </Button>
              </div>

              <div className="border-t border-destructive/30 bg-destructive/5 rounded-b-lg p-6 space-y-6">
                <CardDescription className="text-destructive-foreground/80">
                  সতর্ক থাকুন! এই কাজটি স্থায়ী এবং এটি ফিরিয়ে আনা যাবে না।
                  আপনার সমস্ত ডেটা মুছে ফেলা হবে।
                </CardDescription>
                <Button variant="destructive">
                  আমার অ্যাকাউন্ট ডিলেট করুন
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
