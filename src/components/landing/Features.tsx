import { Card } from "@/components/ui/card";
import {
  analysisData,
  leaderboard,
  questionBankExams,
  questionBankExams2,
  questionBankExams3,
  quickPractice,
  features,
} from "@/lib/data";
import { Clock, Pencil, Trophy, User } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icon } from "../ui/icon";

export function Features() {
  const getRankClasses = (rank: number) => {
    switch (rank) {
      case 1:
        return "border-yellow-400 bg-yellow-400/10";
      case 2:
        return "border-gray-400 bg-gray-400/10";
      case 3:
        return "border-yellow-600 bg-yellow-600/10";
      default:
        return "border-border";
    }
  };

  const getRankTextClass = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-yellow-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-8 p-4 py-16 md:p-14">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="flex max-w-full flex-col overflow-hidden rounded-3xl border bg-card shadow-xl md:col-span-2">
          <h1 className="p-8 text-2xl font-bold">সকল পরীক্ষার প্রশ্নব্যাংক</h1>
          <div className="overflow-x-auto">
            <div className="flex max-w-full flex-col items-center gap-4 px-4 pb-8">
              {[questionBankExams, questionBankExams2, questionBankExams3].map(
                (examRow) => (
                  <div
                    key={examRow.map((e) => e.name).join("-")}
                    className="grid w-full gap-4 md:w-auto md:grid-cols-3"
                  >
                    {examRow.map((exam) => (
                      <Card
                        key={exam.name}
                        className="shrink-0 !p-4 transition-transform hover:-translate-y-1 hover:shadow-lg"
                      >
                        <span className="font-bold tracking-tight">
                          {exam.name}
                        </span>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-0.5">
                            <Clock className="h-3 w-3 stroke-[2]" />
                            <span>{exam.questions} প্রশ্ন </span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <Pencil className="h-3 w-3 stroke-[2]" />
                            <span>{exam.time} মিনিট</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-3xl border bg-card shadow-xl">
          <div className="flex items-center justify-between p-8">
            <h1 className="text-xl font-bold">প্রশ্নব্যাংক বিশ্লেষণ</h1>
            <div className="rounded-full border bg-secondary px-4 py-1 text-sm text-muted-foreground">
              ভেক্টর
            </div>
          </div>
          <div className="h-full min-h-[300px] overflow-x-auto px-8">
            <div className="flex h-full items-end gap-3 pb-8">
              {analysisData.map((data) => (
                <div
                  key={data.year}
                  className="flex h-full grow flex-col justify-end text-center text-xs"
                >
                  <div
                    className="rounded-md bg-foreground"
                    style={{ height: data.height }}
                  />
                  <div className="mt-2">{data.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="flex flex-col overflow-hidden rounded-3xl border bg-card p-0 shadow-xl">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex flex-col gap-2 p-8">
              <h1 className="text-2xl font-bold">মক পরীক্ষা</h1>
              <div className="text-sm text-muted-foreground">
                নিজের ইচ্ছেমত বিষয়, টপিক, সময় ও প্রশ্নের ধরণ নির্বাচন করে মক
                পরীক্ষা দেওয়ার সুযোগ
              </div>
            </div>
            <Image
              src="/mock.webp"
              width={320}
              height={400}
              alt="Mock Exam"
              className="h-[350px] w-full shrink-0 object-cover object-top md:h-[400px] md:w-80"
              data-ai-hint="mock exam"
            />
          </div>
        </Card>
        <Card className="flex flex-col overflow-hidden rounded-3xl border bg-card p-0 shadow-xl">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex flex-col gap-2 p-8">
              <h1 className="text-2xl font-bold">ফলাফল বিশ্লেষণ</h1>
              <div className="text-sm text-muted-foreground">
                নিজের ইচ্ছেমত বিষয়, টপিক, সময় ও প্রশ্নের ধরণ নির্বাচন করে মক
                পরীক্ষা দেওয়ার সুযোগ
              </div>
            </div>
            <Image
              src="/progress.webp"
              width={320}
              height={400}
              alt="Progress"
              className="h-[350px] w-full shrink-0 object-cover object-top md:h-[400px] md:w-80"
              data-ai-hint="progress chart"
            />
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="flex flex-col gap-4 rounded-3xl border bg-card p-8 shadow-xl">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">দ্রুত প্র্যাকটিস</h1>
          </div>
          <div className="flex flex-col justify-between gap-3">
            <p>ব্রিটিশ শাসনের বিরুদ্ধে বাঙালিদের প্রথম বিদ্রোহ-</p>
            {quickPractice.map((answer) => (
              <Card
                key={answer}
                className="!flex-row gap-2 !p-2 !px-3 text-center transition-colors hover:bg-accent"
              >
                <p>{answer}</p>
              </Card>
            ))}
          </div>
        </Card>
        <Card className="flex flex-col rounded-3xl border bg-card p-8 shadow-xl md:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">লাইভ লিডারবোর্ড</h1>
              <p className="text-sm text-muted-foreground">
                দেশের সেরা শিক্ষার্থীদের মধ্যে নিজের অবস্থান যাচাই করে নাও।
              </p>
            </div>
            <Trophy className="h-10 w-10 text-yellow-400" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {leaderboard.map((student, i) => (
              <Card
                key={student.name}
                className={`flex items-center gap-4 border-l-4 p-4 transition-all hover:shadow-md ${getRankClasses(
                  i + 1,
                )}`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-bold ${getRankClasses(
                    i + 1,
                  )} ${getRankTextClass(i + 1)}`}
                >
                  {i + 1}
                </div>
                <Avatar className="h-12 w-12 border-2 border-border">
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <p className="truncate font-semibold">{student.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {student.college}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
