"use client";

import { ArrowRight, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSupabase } from "@/app/supabase-provider";

export function Header() {
  const { session } = useSupabase();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.25)]">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 px-4 md:px-14">
        <Link href="/">
          <Image
            data-ai-hint="logo"
            className="h-8 w-auto"
            src="/logo-dark.webp"
            alt="চর্চা"
            width={100}
            height={32}
          />
        </Link>
        <div className="flex items-center space-x-1">
          {session ? (
            <Link
              href="/dashboard"
              className="btn-3d btn-3d-primary text-black hover:text-black transition-colors duration-200"
            >
              <LayoutGrid className="stroke-[3] w-4 h-4" />
              <span className="font-bold">ড্যাশবোর্ড</span>
            </Link>
          ) : (
            <Link
              href="/auth/register"
              className="btn-3d btn-3d-primary text-black hover:text-black transition-colors duration-200"
            >
              <span className="font-bold">লগইন / রেজিস্ট্রেশন</span>
              <ArrowRight className="stroke-[3] w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
