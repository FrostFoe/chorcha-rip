"use client";
import { useUserData } from "@/providers/UserDataProvider";
import {
  Crown,
  Flame,
  Sparkles,
  Trophy,
  User,
  Zap,
  Book,
  Pen,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

export function ProfileHeader() {
  const { profile } = useUserData();

  return (
    <>
      <div className="flex items-center justify-between border-b pb-5 mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          <h1 className="block text-2xl font-bold">প্রোফাইল</h1>
        </div>
        <button
          type="button"
          className="text-sm py-1 px-3 cursor-pointer bg-red-100 dark:bg-red-900/40 text-red-600 rounded-full flex items-center gap-2"
        >
          <Flame className="h-4 w-4" />
          <p className="text-base font-bold text-red-900 dark:text-red-600">
            ০
          </p>
        </button>
      </div>
      <div className="mt-3 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mx-auto card cursor-auto p-6">
        <div className="w-full md:w-auto">
          <div className="flex flex-col md:flex-row justify-center md:justify-start items-center space-y-4 md:space-y-0 md:space-x-6 w-full">
            <div className="relative flex items-center justify-center">
              <Avatar className="w-24 h-24 rounded-full border-2 border-border">
                <AvatarImage
                  src={profile?.avatar_url}
                  alt={profile?.full_name ?? "User"}
                />
                <AvatarFallback>
                  <User className="h-12 w-12 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-5 -right-2">
                <Crown className="size-14 text-yellow-400 drop-shadow-lg" />
              </div>
            </div>
            <div className="flex flex-col space-y-2 items-center md:items-start text-center md:text-left">
              <h1 className="text-xl font-semibold">
                {profile?.full_name || "Guest"}
              </h1>
              <span className="text-xs leading-tight font-medium opacity-70">
                নিগাতলা প্রকৌশল বিশ্ববিদ্যালয় (NUET)
              </span>
              <span className="py-1 px-3 text-xs font-bold bg-primary/10 text-primary rounded-full">
                Batch : HSC-26
              </span>
            </div>
          </div>
        </div>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 pt-4 md:pt-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex items-center space-x-3"
            variants={itemVariants}
          >
            <Trophy className="text-purple-500 size-7" />
            <div className="flex flex-col items-start">
              <h2 className="text-base font-bold">...</h2>
              <p className="text-xs text-muted-foreground">বর্তমান র‍্যাংক</p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center space-x-3"
            variants={itemVariants}
          >
            <Sparkles className="text-orange-500 size-7" />
            <div className="flex flex-col items-start">
              <h2 className="text-base font-bold">০</h2>
              <p className="text-xs text-muted-foreground">XP</p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center space-x-3"
            variants={itemVariants}
          >
            <Pen className="text-green-700 size-7" />
            <div className="flex flex-col items-start">
              <h2 className="text-base font-bold">৩৫</h2>
              <p className="text-xs text-muted-foreground">মোট পরীক্ষা</p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center space-x-3"
            variants={itemVariants}
          >
            <Flame className="text-orange-500 size-7" />
            <div className="flex flex-col items-start">
              <h2 className="text-base font-bold">০</h2>
              <p className="text-xs text-muted-foreground">দিনের স্ট্রিক</p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center space-x-3"
            variants={itemVariants}
          >
            <Zap className="text-cyan-500 size-7" />
            <div className="flex flex-col items-start">
              <h2 className="text-base font-bold">০</h2>
              <p className="text-xs text-muted-foreground">ডাউট সমাধান</p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center space-x-3"
            variants={itemVariants}
          >
            <Trophy className="text-cyan-500 size-7" />
            <div className="flex flex-col items-start">
              <h2 className="text-base font-bold">আয়রন </h2>
              <p className="text-xs text-muted-foreground">লীগ</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
