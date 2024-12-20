import { Question, Language } from "@/types/game";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Brain, CheckCircle2, XCircle, Calculator, Shapes, Ruler } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  isAnswered: boolean;
  selectedAnswer?: string;
  language: Language;
}

const getTopicIcon = (topic: string) => {
  switch (topic) {
    case 'arithmetic':
      return <Calculator className="w-6 h-6" />;
    case 'geometry':
      return <Shapes className="w-6 h-6" />;
    case 'measurement':
      return <Ruler className="w-6 h-6" />;
    default:
      return <Brain className="w-6 h-6" />;
  }
};

export const QuestionCard = ({
  question,
  onAnswer,
  isAnswered,
  selectedAnswer,
  language
}: QuestionCardProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in bg-gradient-to-br from-game-accent/20 to-background shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          {getTopicIcon(question.topic)}
          <CardTitle className="text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
            {question.question[language]}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 p-6">
        {question.options.map((option) => (
          <Button
            key={option}
            onClick={() => !isAnswered && onAnswer(option)}
            className={cn(
              "h-16 text-lg transform transition-all duration-300 hover:scale-105 relative overflow-hidden group",
              isAnswered && option === question.correctAnswer && "bg-game-success hover:bg-game-success animate-bounce-custom",
              isAnswered && selectedAnswer === option && option !== question.correctAnswer && "bg-game-error hover:bg-game-error animate-shake",
              !isAnswered && "bg-game-primary hover:bg-game-primary/90"
            )}
            disabled={isAnswered}
          >
            <span className="relative z-10 flex items-center gap-2">
              {option}
              {isAnswered && option === question.correctAnswer && (
                <CheckCircle2 className="w-5 h-5 animate-scale-in" />
              )}
              {isAnswered && selectedAnswer === option && option !== question.correctAnswer && (
                <XCircle className="w-5 h-5 animate-scale-in" />
              )}
            </span>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};