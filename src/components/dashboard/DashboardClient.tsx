"use client"

import { Book, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DashboardHeader } from "./DashboardHeader"
import { Loader } from "../ui/loader"
import { useUserData } from "@/providers/UserDataProvider"
import * as React from "react"

function DashboardClientComponent() {
  const { enrolledCourses, loading } = useUserData()

  return (
    <>
      <DashboardHeader />
      <div className="space-y-8">
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Book className="h-7 w-7" />
              আমার কোর্সসমূহ
            </h2>
            <Button variant="link" asChild>
              <Link href="/my-courses">সব দেখুন</Link>
            </Button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader />
            </div>
          ) : enrolledCourses.length === 0 ? (
            <div className="text-center py-10 rounded-lg bg-card/50">
              <p className="text-muted-foreground">
                আপনি এখনও কোনো কোর্সে ভর্তি হননি।
              </p>
              <Button asChild className="mt-4">
                <Link href="/browse">কোর্স ব্রাউজ করুন</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {enrolledCourses.slice(0, 4).map((course) => (
                <Card
                  key={course.id}
                  className="group flex flex-col overflow-hidden rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={course.thumbnail}
                      alt={course.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="mb-2 flex-grow text-lg font-semibold">
                      {course.name}
                    </h3>
                    <Progress value={course.progress} className="h-2" />
                    <div className="mt-2 mb-4 flex items-center justify-between text-sm text-muted-foreground">
                      <span>সম্পন্ন: {course.progress}%</span>
                      {course.progress === 100 && (
                        <span className="flex items-center gap-1 text-primary">
                          <CheckCircle2 className="h-4 w-4" /> সম্পন্ন হয়েছে
                        </span>
                      )}
                    </div>
                    <Button
                      asChild
                      className="mt-auto w-full transition-colors duration-300"
                    >
                      <Link href={`/courses/${course.slug}/learn`}>
                        শেখা চালিয়ে যান
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-1">
          {/* ProgressReport can be made dynamic in a future step */}
          {/* <ProgressReport items={dashboardProgress} /> */}
        </div>
      </div>
    </>
  )
}

export const DashboardClient = React.memo(DashboardClientComponent)
