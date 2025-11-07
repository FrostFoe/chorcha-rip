"use client";

import { useUserData } from "@/providers/UserDataProvider";
import { memo } from "react";

function DashboardHeaderComponent() {
  const { profile } = useUserData();
  const userName = profile?.full_name || "Guest";

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">স্বাগতম, {userName} 👋</h1>
      <p className="text-muted-foreground mt-2">চলুন শেখা চালিয়ে যাই!</p>
    </div>
  );
}

export const DashboardHeader = memo(DashboardHeaderComponent);
