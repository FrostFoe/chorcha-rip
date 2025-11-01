import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Compass, Gem, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllCoursesData } from "@/lib/courses";
import { Badge } from "@/components/ui/badge";

export default async function BrowsePage() {
  const courses = await getAllCoursesData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pb-20">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Compass className="w-8 h-8" />
              ব্রাউজ কোর্স
            </h1>
            <p className="text-muted-foreground mt-2">
              আপনার পছন্দের কোর্সটি খুঁজে নিন এবং শেখা শুরু করুন।
            </p>
          </div>
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="কোর্স খুঁজুন..."
                className="w-full rounded-lg bg-card pl-10 h-12"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <Card
                key={course.slug}
                className="group flex flex-col overflow-hidden rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2 flex items-center gap-1.5">
                    <Gem className="h-4 w-4" />
                    {course.price}
                  </Badge>
                </div>
                <div className="flex flex-col flex-grow p-4">
                  <h3 className="mb-2 flex-grow text-lg font-semibold">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {course.instructor}
                  </p>
                  <Button
                    asChild
                    className="mt-auto w-full transition-colors duration-300"
                  >
                    <Link href={`/courses/${course.slug}`}>কোর্স দেখুন</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
