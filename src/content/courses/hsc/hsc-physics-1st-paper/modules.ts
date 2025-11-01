import type { Module } from "@/lib/types"

export const modules: Omit<Module, "lessons">[] = [
  {
    slug: "introduction",
    title: "Module 1: Introduction",
  },
  {
    slug: "vectors",
    title: "Module 2: Vectors",
  },
]
