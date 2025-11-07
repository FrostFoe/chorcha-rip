import {
  BrainCircuit,
  FileText,
  History,
  LucideProps,
  Trophy,
} from "lucide-react";
import type { Feature, GemPack, LeaderboardEntry } from "./types";

export const questionBankExams = [
  { name: "BUET Preli 2022", questions: 100, time: 60 },
  { name: "Medical 2022", questions: 100, time: 60 },
  { name: "IUT 2022", questions: 100, time: 60 },
];

export const questionBankExams2 = [
  { name: "Dental 2022", questions: 100, time: 60 },
  { name: "BCS Preli 2022", questions: 100, time: 60 },
  { name: "Rajshahi University 2022", questions: 100, time: 60 },
];

export const questionBankExams3 = [
  { name: "Rajshahi University 2022", questions: 100, time: 60 },
  { name: "Dhaka University A 2022", questions: 100, time: 60 },
  { name: "CKRUET 2022", questions: 100, time: 60 },
];

export const analysisData = [
  { year: "2017", height: "63.288%" },
  { year: "2018", height: "77.8344%" },
  { year: "2019", height: "67.4091%" },
  { year: "2020", height: "65.5979%" },
  { year: "2021", height: "71.5741%" },
  { year: "2022", height: "79.0024%" },
];

export const quickPractice = [
  "ব্রিটিশশাসনের বিরুদ্ধে বাঙালিদের প্রথম বিদ্রোহ-",
  "ফকির ও সন্ন্যাসী বিদ্রোহ",
  "নীল বিদ্রোহ",
  "সিপাহী বিদ্রোহ",
  "আগস্ট (১৯৪২) বিদ্রোহ",
];

export const leaderboard: LeaderboardEntry[] = [
  {
    name: "তাসপিয়া নাসরিন",
    college: "ঢাকা কলেজ",
  },
  {
    name: "ফারদিন ফাহিম",
    college: "রাজশাহী কলেজ",
  },
  {
    name: "মোঃ ফাহিম",
    college: "চট্টগ্রাম কলেজ",
  },
  {
    name: "ওয়ালিদ হাসান",
    college: "আনন্দ মোহন কলেজ",
  },
  {
    name: "আফরিন সুলতানা",
    college: "নটর ডেম কলেজ",
  },
  {
    name: "মেহেদি হাসান",
    college: "ভিক্টোরিয়া কলেজ",
  },
];

export const features: Feature[] = [
  {
    icon: "History",
    title: "বিগত বছরসমূহের প্রশ্ন ব্যাংক",
    description: "১০ লক্ষ+ প্রশ্ন ডাটাবেজ",
  },
  {
    icon: "FileText",
    title: "আনলিমিটেড পরীক্ষা ও ব্যাখ্যা",
    description: "প্র্যাকটিস এর মাধ্যমে নিজেকে তৈরি করে ফেলো",
  },
  {
    icon: "BrainCircuit",
    title: "ডাউট সলভিং চর্চা AI",
    description: "উত্তর দিবে তোমার বই থেকে ও তোমার মত করে।",
  },
  {
    icon: "Trophy",
    title: "সারা দেশব্যাপী লিডারবোর্ড",
    description: "সারা দেশের শিক্ষার্থীদের মধ্যে নিজের অবস্থান যাচাই",
  },
];

export const gemPacks: GemPack[] = [
  { amount: 500, price: 99 },
  { amount: 1000, price: 179 },
  { amount: 5000, price: 499 },
];
