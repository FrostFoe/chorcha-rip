"use client";

import { useSupabase } from "@/app/supabase-provider";
import Image from "next/image";
import Link from "next/link";
import { Ghost, Github, Chrome } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { DesignedButton } from "@/components/ui/DesignedButton";

export default function RegisterPage() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { toast } = useToast();

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleAnonymousLogin = async () => {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "সাইন ইন করতে সমস্যা হয়েছে।",
      });
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Link href="/">
            <Image
              className="mb-2 h-14 w-14"
              alt="Chorcha Logo"
              src="/logo-dark.webp"
              width={56}
              height={56}
              data-ai-hint="logo dark"
            />
          </Link>
          <h1 className="mt-4 text-xl font-medium">রেজিস্ট্রেশন / লগইন</h1>
        </div>

        <div className="mt-12 text-left">
          <label htmlFor="phone" className="text-sm font-medium">
            মোবাইল নাম্বার
          </label>
          <div className="mt-2 flex items-start gap-2">
            <Input
              id="phone"
              type="tel"
              placeholder="01XXXXXXXXX"
              className="h-12 flex-grow rounded-lg border-border bg-card text-card-foreground placeholder:text-muted-foreground"
            />
            <DesignedButton
              type="submit"
              className="h-12 flex-shrink-0 rounded-lg px-6 text-base font-medium"
            >
              শুরু করো
            </DesignedButton>
          </div>
        </div>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-grow bg-border" />
          <span className="text-base text-muted-foreground">অথবা,</span>
          <div className="h-px flex-grow bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DesignedButton
            onClick={handleGitHubLogin}
            variant="outline"
            className="h-12 w-full justify-center gap-3 rounded-lg"
          >
            <Github className="h-5 w-5" />
            GitHub
          </DesignedButton>
          <DesignedButton
            onClick={handleGoogleLogin}
            variant="outline"
            className="h-12 w-full justify-center gap-3 rounded-lg"
          >
            <Chrome className="h-5 w-5" />
            Google
          </DesignedButton>
        </div>

        <div className="mt-4">
          <DesignedButton
            variant="outline"
            onClick={handleAnonymousLogin}
            className="h-12 w-full justify-center gap-3 rounded-lg"
          >
            <Ghost className="h-5 w-5" />
            Guest
          </DesignedButton>
        </div>
      </div>
    </div>
  );
}
