"use client";

import {
  Lightbulb,
  TrendingUp,
  Target,
  BookUser,
  Palette,
  Users,
  CheckCircle,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/lib/types";

const icons = {
  Lightbulb,
  TrendingUp,
  Target,
  BookUser,
  Palette,
  Users,
  CheckCircle,
};

interface IconProps extends LucideProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    return null;
  }
  return <LucideIcon {...props} />;
}
