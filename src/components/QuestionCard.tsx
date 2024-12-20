import { Question, Language } from "@/types/game";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  isAnswered: boolean;
  selectedAnswer?: string;
  language: Language;
}

export const QuestionCard = ({
  question,
  onAnswer,
  isAnswered,
  selectedAnswer,
  language
}: QuestionCardProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{question.question[language]}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {question.options.map((option) => (
          <Button
            key={option}
            onClick={() => !isAnswered && onAnswer(option)}
            className={cn(
              "h-16 text-lg transform transition-all duration-200 hover:scale-105",
              isAnswered && option === question.correctAnswer && "bg-game-success hover:bg-game-success animate-bounce-custom",
              isAnswered && selectedAnswer === option && option !== question.correctAnswer && "bg-game-error hover:bg-game-error animate-shake",
              !isAnswered && "bg-game-primary hover:bg-game-primary/90"
            )}
            disabled={isAnswered}
          >
            {option}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};