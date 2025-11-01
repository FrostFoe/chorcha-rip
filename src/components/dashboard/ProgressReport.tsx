import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { DashboardProgressItem } from "@/lib/types";
import { memo } from "react";

interface ProgressReportProps {
  items: DashboardProgressItem[];
}

function ProgressReportComponent({ items }: ProgressReportProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          আপনার সামগ্রিক অগ্রগতি
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <AccordionItem
              key={item.subject}
              value={item.subject}
              className="border-b-border"
            >
              <AccordionTrigger className="py-4 text-base font-medium hover:no-underline">
                <div className="flex w-full items-center justify-between">
                  <span>{item.subject}</span>
                  <span className="mr-4 font-bold text-primary">
                    {item.percentage.toFixed(0)}%
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <Progress value={item.percentage} className="h-2" />
                <div className="mt-2 text-xs text-muted-foreground">
                  আপনি এই বিষয়ে {item.percentage.toFixed(0)}% সম্পন্ন করেছেন।
                  চালিয়ে যান!
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export const ProgressReport = memo(ProgressReportComponent);
