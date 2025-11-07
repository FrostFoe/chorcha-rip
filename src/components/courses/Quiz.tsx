"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import type { QuizQuestion } from "@/lib/types";
import { DesignedButton } from "../ui/DesignedButton";

interface QuizProps {
  questions: QuizQuestion[];
  onQuizComplete: () => void;
}

export function Quiz({ questions, onQuizComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<
    (number | null)[]
  >(Array(questions.length).fill(null));
  const [showResults, setShowResults] = React.useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      onQuizComplete();
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score: number, answer, index) => {
      if (answer === questions[index].correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage =
      questions.length > 0 ? (score / questions.length) * 100 : 0;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">কুইজের ফলাফল</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-4xl font-bold">
            {score} / {questions.length}
          </p>
          <p
            className={`mt-2 text-2xl font-semibold ${
              percentage >= 50 ? "text-primary" : "text-destructive"
            }`}
          >
            {percentage.toFixed(2)}%
          </p>
          <p className="mt-4 text-muted-foreground">
            আপনার কুইজ সম্পন্ন হয়েছে। পরবর্তী পাঠে এগিয়ে যান।
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          প্রশ্ন {currentQuestionIndex + 1}/{questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-lg">{currentQuestion.questionText}</p>
        <div className="space-y-3">
          {currentQuestion.options?.map((option) => (
            <Button
              key={option}
              variant={
                selectedAnswers[currentQuestionIndex] ===
                currentQuestion.options?.indexOf(option)
                  ? "secondary"
                  : "outline"
              }
              className="w-full justify-start h-auto py-3"
              onClick={() =>
                handleAnswerSelect(
                  currentQuestion.options?.indexOf(option) ?? -1,
                )
              }
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <DesignedButton
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestionIndex] === null}
          >
            {currentQuestionIndex < questions.length - 1
              ? "পরবর্তী"
              : "ফলাফল দেখুন"}
          </DesignedButton>
        </div>
      </CardContent>
    </Card>
  );
}
