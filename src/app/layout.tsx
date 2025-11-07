import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SupabaseProvider from "./supabase-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { UserDataProvider } from "@/providers/UserDataProvider";
import { getAllCoursesData } from "@/lib/courses";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "HSC, SSC, Admission ও BCS এর সেরা প্রস্তুতি",
  description:
    "নিজের পছন্দমত হাজার হাজার প্রশ্ন থেকে বিষয় ও অধ্যায়ভিত্তিক পরীক্ষা, পূর্বের ভুল রিভিউ, এবং লাইভ পরীক্ষার এর মাধ্যমে প্রস্তুত হও যেকোন পরীক্ষার জন্য",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allCourses = await getAllCoursesData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          hindSiliguri.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SupabaseProvider>
            <UserDataProvider allCourses={allCourses}>
              {children}
            </UserDataProvider>
          </SupabaseProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
