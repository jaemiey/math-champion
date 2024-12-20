import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Score } from "@/types/game";

interface ScoreBoardProps {
  scores: Score[];
}

export const ScoreBoard = ({ scores }: ScoreBoardProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Top Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scores.map((score, index) => (
            <div
              key={`${score.playerName}-${score.date}`}
              className="flex justify-between items-center p-3 bg-game-primary/10 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold">{index + 1}</span>
                <span>{score.playerName}</span>
              </div>
              <span className="text-xl font-bold">{score.score}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};