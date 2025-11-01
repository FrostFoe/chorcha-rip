
"use client";

import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { Ghost, Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const supabase = createClientComponentClient();
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
    const { error } = await supabase.auth.signInAnonymously({
      options: {
        // This ensures the session is stored and refreshed automatically
        autoRefreshToken: true,
        persistSession: true,
      },
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: error.message,
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
            <Button
              type="submit"
              className="h-12 flex-shrink-0 rounded-lg bg-primary px-6 text-base font-medium text-primary-foreground hover:bg-primary/90"
            >
              শুরু করো
            </Button>
          </div>
        </div>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-grow bg-border" />
          <span className="text-base text-muted-foreground">অথবা,</span>
          <div className="h-px flex-grow bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button
            onClick={handleGitHubLogin}
            variant="outline"
            className="h-12 w-full justify-center gap-3 rounded-lg"
          >
            <Github className="h-5 w-5" />
            GitHub
          </Button>
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="h-12 w-full justify-center gap-3 rounded-lg"
          >
            <Image src="/svgs/google.svg" alt="google" width={24} height={24} />
            Google
          </Button>
        </div>

        <div className="mt-4">
          <Button
            variant="outline"
            onClick={handleAnonymousLogin}
            className="h-12 w-full justify-center gap-3 rounded-lg"
          >
            <Ghost className="mr-2 h-4 w-4" />
            Continue Anonymously
          </Button>
        </div>
      </div>
    </div>
  );
}
