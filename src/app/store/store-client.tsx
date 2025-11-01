"use client";

import * as React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gem, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserData } from "@/providers/UserDataProvider";
import { useToast } from "@/hooks/use-toast";

const gemPacks = [
  { amount: 100, price: 100 },
  { amount: 550, price: 500, bonus: 50 },
  { amount: 1200, price: 1000, bonus: 200 },
  { amount: 3000, price: 2500, bonus: 500 },
];

export function StoreClient() {
  const isMobile = useIsMobile();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const { gemBalance, addGems } = useUserData();
  const { toast } = useToast();

  const toggleSidebar = React.useCallback(
    () => setIsSidebarCollapsed((prev) => !prev),
    [],
  );

  const handlePurchase = (amount: number) => {
    addGems(amount);
    toast({
      title: "Gems কেনা সফল হয়েছে!",
      description: `আপনার একাউন্টে ${amount} Gem যোগ করা হয়েছে।`,
    });
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
              <Store className="w-8 h-8" />
              Gem স্টোর
            </h1>
            <p className="text-muted-foreground mt-2">
              কোর্স কেনার জন্য Gem কিনুন।
            </p>
          </div>
          <Card className="mb-8 max-w-sm mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">আপনার ব্যালেন্স</CardTitle>
              <CardDescription className="text-4xl font-bold text-primary flex items-center justify-center gap-2">
                <Gem className="h-8 w-8" />
                {gemBalance}
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gemPacks.map((pack) => (
              <Card key={pack.amount} className="flex flex-col">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Gem className="h-7 w-7 text-primary" />
                    {pack.amount}
                  </CardTitle>
                  {pack.bonus && (
                    <CardDescription className="text-primary font-semibold">
                      ( بونس +{pack.bonus} Gem )
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <p className="text-2xl font-bold">৳{pack.price}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => handlePurchase(pack.amount)}
                  >
                    কিনুন
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
