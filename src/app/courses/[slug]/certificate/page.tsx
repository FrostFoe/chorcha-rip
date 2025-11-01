"use client"

import { Certificate } from "@/components/courses/Certificate"
import { useSupabase } from "@/app/supabase-provider"
import { notFound, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader } from "@/components/ui/loader"
import type { Course } from "@/lib/types"
import { getAllLessonsData } from "@/lib/lessons"
import { getCourseData } from "@/lib/courses"

export default function CertificatePage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const { session } = useSupabase()

  const [userName, setUserName] = useState("ব্যবহারকারী")
  const [course, setCourse] = useState<Course | null | undefined>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const currentCourse = await getCourseData(slug)
      setCourse(currentCourse)

      if (session?.user && currentCourse) {
        // Fetch user name
        const localProfile = localStorage.getItem(
          `chorcha-profile-${session.user.id}`
        )
        if (localProfile) {
          const profile = JSON.parse(localProfile)
          setUserName(
            profile.full_name || session.user.user_metadata?.name || "ব্যবহারকারী"
          )
        } else {
          setUserName(session.user.user_metadata?.name || "ব্যবহারকারী")
        }

        // Check course completion status
        const progressKey = `chorcha-progress-${currentCourse.id}-${session.user.id}`
        const progressData = localStorage.getItem(progressKey)
        if (progressData) {
          const completedLessons: string[] = JSON.parse(progressData)
          const allLessons = await getAllLessonsData(slug)
          const totalLessons = allLessons.length
          const progress =
            totalLessons > 0
              ? (completedLessons.length / totalLessons) * 100
              : 0
          if (progress >= 100) {
            setIsAuthorized(true)
          }
        }
      }
      setLoading(false)
    }
    fetchData()
  }, [session, slug])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader />
      </div>
    )
  }

  if (!course || !isAuthorized) {
    notFound()
  }

  return <Certificate courseName={course.title} studentName={userName} />
}
