"use client"

import { Sidebar } from "@/components/dashboard/Sidebar"
import { MobileNav } from "@/components/dashboard/MobileNav"
import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSupabase } from "@/app/supabase-provider"
import Image from "next/image"
import { Moon, Sun, User } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useUserData } from "@/providers/UserDataProvider"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const isMobile = useIsMobile()
  const { session } = useSupabase()
  const user = session?.user
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const { profile, loading, updateProfile } = useUserData()

  const [fullName, setFullName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [updating, setUpdating] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = useCallback(
    () => setIsSidebarCollapsed((prev) => !prev),
    []
  )

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "")
      setAvatarUrl(profile.avatar_url || "")
    }
  }, [profile])

  const handleUpdateProfile = useCallback(async () => {
    if (!user) return

    try {
      setUpdating(true)
      await updateProfile({
        full_name: fullName,
        avatar_url: avatarUrl,
      })

      toast({
        title: "প্রোফাইল আপডেট হয়েছে",
        description: "আপনার তথ্য সফলভাবে সংরক্ষণ করা হয়েছে।",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "কিছু একটা ভুল হয়েছে!",
        description: "আপনার প্রোফাইল আপডেট করা যায়নি।",
      })
      console.error("Error updating profile:", error)
    } finally {
      setUpdating(false)
    }
  }, [user, fullName, avatarUrl, toast, updateProfile])

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <h2 className="text-2xl font-bold">অনুগ্রহ করে লগইন করুন</h2>
        <p className="mt-2 text-muted-foreground">
          আপনার প্রোফাইল দেখতে হলে আপনাকে লগইন করতে হবে।
        </p>
        <Button asChild className="mt-6">
          <Link href="/auth/register">লগইন / রেজিস্ট্রেশন</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
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
              : "lg:ml-sidebar-expanded"
        )}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <User className="w-8 h-8" />
              প্রোফাইল
            </h1>
            <p className="text-muted-foreground mt-2">
              আপনার ব্যক্তিগত তথ্য এখানে পরিবর্তন করুন।
            </p>
          </div>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>আপনার তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarUrl} alt="Avatar" />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>

                <div>
                  <Button variant="outline">ছবি পরিবর্তন করুন</Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  পুরো নাম
                </label>
                <Input
                  id="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading || updating}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  ইমেইল
                </label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email || ""}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="theme" className="text-sm font-medium">
                  থিম
                </label>
                <div id="theme" className="flex items-center space-x-2">
                  <Button
                    variant={theme === "light" ? "secondary" : "outline"}
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    লাইট
                  </Button>
                  <Button
                    variant={theme === "dark" ? "secondary" : "outline"}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    ডার্ক
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleUpdateProfile}
                disabled={loading || updating}
              >
                {updating ? "সংরক্ষণ করা হচ্ছে..." : "সংরক্ষণ করুন"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
