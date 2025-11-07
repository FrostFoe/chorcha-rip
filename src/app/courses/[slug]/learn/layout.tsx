'use client';

import { CourseLearnLayout } from '@/components/courses/CourseLearnLayout';
import { getCourseAndModulesData } from '@/lib/courses';
import type { Course, Module } from '@/lib/types';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CourseLearnPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<{ course: Course; modules: Module[] } | null>(
    null,
  );
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getCourseAndModulesData(params.slug as string);
      if (!fetchedData) {
        notFound();
      }
      setData(fetchedData);
    }

    fetchData();
  }, [params.slug]);

  if (!data) {
    return null;
  }

  return (
    <CourseLearnLayout course={data.course} modules={data.modules}>
      {children}
    </CourseLearnLayout>
  );
}
