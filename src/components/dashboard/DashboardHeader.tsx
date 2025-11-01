"use client";

import { useSupabase } from "@/app/supabase-provider";
import { useEffect, useState, memo } from "react";

function DashboardHeaderComponent() {
  const { session } = useSupabase();
  const [userName, setUserName] = useState("ব্যবহারকারী");

  useEffect(() => {
    if (session?.user) {
      const localProfile = localStorage.getItem(
        `chorcha-profile-${session.user.id}`,
      );
      if (localProfile) {
        const profile = JSON.parse(localProfile);
        setUserName(profile.full_name || "ব্যবহারকারী");
      } else {
        setUserName(session.user.user_metadata?.name || "ব্যবহারকারী");
      }
    }
  }, [session]);

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">স্বাগতম, {userName} 👋</h1>
      <p className="text-muted-foreground mt-2">চলুন শেখা চালিয়ে যাই!</p>
    </div>
  );
}

export const DashboardHeader = memo(DashboardHeaderComponent);
