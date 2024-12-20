import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Score, Language } from "@/types/game";
import { translations } from "@/config/languages";
import { Trophy, Medal, Star } from "lucide-react";

interface ScoreBoardProps {
  scores: Score[];
  language: Language;
}

const getRankIcon = (index: number) => {
  switch (index) {
    case 0:
      return <Trophy className="w-6 h-6 text-yellow-500 animate-bounce-custom" />;
    case 1:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 2:
      return <Medal className="w-6 h-6 text-amber-600" />;
    default:
      return <Star className="w-5 h-5 text-game-primary" />;
  }
};

export const ScoreBoard = ({ scores, language }: ScoreBoardProps) => {
  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-game-accent/20 to-background shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-game-primary" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
            {translations[language].topScores}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scores.map((score, index) => (
            <div
              key={`${score.playerName}-${score.date}`}
              className="flex justify-between items-center p-4 rounded-lg transform transition-all duration-300 hover:scale-105 bg-gradient-to-r from-game-primary/10 to-game-secondary/10 hover:from-game-primary/20 hover:to-game-secondary/20 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(index)}
                </div>
                <span className="font-medium text-game-dark">{score.playerName}</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
                {score.score}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};