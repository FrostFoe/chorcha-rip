"use client";

import * as React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BrainCircuit, Coins, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useUserData } from "@/providers/UserDataProvider";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { features, gemPacks } from "@/lib/data";

export function StoreClient() {
  const isMobile = useIsMobile();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const { addGems } = useUserData();
  const { toast } = useToast();
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = React.useState(false);
  const [selectedPack, setSelectedPack] = React.useState<{
    amount: number;
    price: number;
  } | null>(null);

  const toggleSidebar = React.useCallback(
    () => setIsSidebarCollapsed((prev) => !prev),
    [],
  );

  const handlePurchase = () => {
    if (!selectedPack) return;

    setIsProcessingPayment(true);
    setTimeout(() => {
      addGems(selectedPack.amount);
      toast({
        title: "সাফল্য!",
        description: `আপনার অ্যাকাউন্টে ${selectedPack.amount.toLocaleString(
          "bn-BD",
        )} Bitcoin যোগ করা হয়েছে।`,
      });
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
      setSelectedPack(null);
    }, 2000); // 2-second mock processing time
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
            ? "pt-4"
            : isSidebarCollapsed
              ? "lg:ml-sidebar-collapsed"
              : "lg:ml-sidebar-expanded",
        )}
      >
        <div className="min-h-screen">
          <div className="relative pb-8 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Bitcoin কিনুন
            </h2>
            <div className="w-full pb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gemPacks.map((pack) => (
                  <Card
                    key={pack.amount}
                    className="flex flex-col items-center justify-center p-6 text-center"
                  >
                    <CardContent className="flex flex-col items-center gap-4">
                      <Coins className="w-16 h-16 text-primary" />
                      <h3 className="text-2xl font-bold">
                        {pack.amount.toLocaleString("bn-BD")} Bitcoin
                      </h3>
                      <p className="text-xl font-semibold">
                        ৳ {pack.price.toLocaleString("bn-BD")}
                      </p>
                      <Button
                        onClick={() => {
                          setSelectedPack(pack);
                          setShowPaymentModal(true);
                        }}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                      >
                        কিনুন
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-sm p-6 space-y-6">
            <CardHeader className="p-0 text-center">
              <CardTitle>পেমেন্ট সম্পন্ন করুন</CardTitle>
              <CardDescription>
                {selectedPack?.amount.toLocaleString("bn-BD")} Bitcoin কিনছেন{" "}
                {selectedPack?.price.toLocaleString("bn-BD")} টাকায়।
              </CardDescription>
            </CardHeader>
            <div className="flex items-center justify-center bg-gray-800 overflow-hidden p-1 border border-white border-opacity-30 rounded-lg shadow-md h-9">
              <Input
                className="w-42 h-full border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2"
                type="text"
                name="text"
                id="input"
                placeholder="0000 0000 0000 0000"
                disabled={isProcessingPayment}
              />
              <div className="flex items-center justify-center relative w-10 h-6 bg-gray-800 overflow-hidden p-1 border border-white border-opacity-30 rounded-lg shadow-md">
                <svg
                  className="text-white fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 48 48"
                >
                  <title>Bitcoin Icon</title>
                  <path
                    fill="#ff9800"
                    d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                  />
                  <path
                    fill="#d50000"
                    d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                  />
                  <path
                    fill="#ff3d00"
                    d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowPaymentModal(false)}
                className="w-full"
                disabled={isProcessingPayment}
              >
                বাতিল
              </Button>
              <Button
                onClick={handlePurchase}
                className="w-full"
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Pay Now"
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
