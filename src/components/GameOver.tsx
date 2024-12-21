import { Button } from "@/components/ui/button";
import { ScoreBoard } from "@/components/ScoreBoard";
import { translations } from "@/config/languages";
import { Score, Language } from "@/types/game";

interface GameOverProps {
  score: number;
  language: Language;
  scores: Score[];
  onPlayAgain: () => void;
}

export const GameOver = ({ score, language, scores, onPlayAgain }: GameOverProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-game-primary/20 to-background p-4">
      <div className="text-center mb-8 animate-bounce-custom">
        <h1 className="text-4xl font-bold mb-4">{translations[language].gameOver}</h1>
        <p className="text-2xl">{translations[language].yourScore}: {score}</p>
      </div>
      <div className="w-full max-w-md space-y-8">
        <ScoreBoard scores={scores} language={language} />
        <Button 
          onClick={onPlayAgain}
          className="w-full bg-game-primary hover:bg-game-primary/90 text-lg h-12 transform transition-all duration-200 hover:scale-105"
        >
          {translations[language].playAgain}
        </Button>
      </div>
    </div>
  );
};