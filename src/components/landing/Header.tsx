"use client";

import { ArrowRight, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSupabase } from "@/app/supabase-provider";
import { DesignedButton } from "../ui/DesignedButton";
import { useRouter } from "next/navigation";
import { AnimatedButtonWrapper } from "../ui/AnimatedButtonWrapper";

export function Header() {
  const { session } = useSupabase();
  const router = useRouter();

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
          <AnimatedButtonWrapper>
            {session ? (
              <DesignedButton
                onClick={() => router.push("/dashboard")}
                className="!px-6 !py-3"
              >
                <LayoutGrid className="stroke-[3] w-4 h-4 mr-2" />
                <span className="font-bold">ড্যাশবোর্ড</span>
              </DesignedButton>
            ) : (
              <DesignedButton
                onClick={() => router.push("/auth/register")}
                className="!px-6 !py-3"
              >
                <span className="font-bold">লগইন</span>
                <ArrowRight className="stroke-[3] w-4 h-4 ml-2" />
              </DesignedButton>
            )}
          </AnimatedButtonWrapper>
        </div>
      </div>
    </header>
  );
}
