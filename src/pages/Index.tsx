import { useState, useEffect } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { ScoreBoard } from "@/components/ScoreBoard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { questions } from "@/data/questions";
import { Score, GameState } from "@/types/game";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    isGameOver: false,
  });
  const [playerName, setPlayerName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [scores, setScores] = useState<Score[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const { toast } = useToast();

  useEffect(() => {
    const savedScores = localStorage.getItem("mathGameScores");
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  const handleStartGame = () => {
    if (!playerName.trim()) {
      toast({
        title: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    setIsPlaying(true);
    setGameState({
      currentQuestion: 0,
      score: 0,
      isGameOver: false,
    });
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    const isCorrect = answer === questions[gameState.currentQuestion].correctAnswer;
    
    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        className: "bg-game-success text-white",
      });
      setGameState(prev => ({
        ...prev,
        score: prev.score + 20,
      }));
    } else {
      toast({
        title: "Try again! 💪",
        className: "bg-game-error text-white",
      });
    }

    setTimeout(() => {
      setIsAnswered(false);
      setSelectedAnswer(undefined);
      
      if (gameState.currentQuestion === questions.length - 1) {
        const newScore: Score = {
          playerName,
          score: isCorrect ? gameState.score + 20 : gameState.score,
          date: new Date().toISOString(),
        };
        
        const newScores = [...scores, newScore]
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);
        
        setScores(newScores);
        localStorage.setItem("mathGameScores", JSON.stringify(newScores));
        setGameState(prev => ({ ...prev, isGameOver: true }));
      } else {
        setGameState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
        }));
      }
    }, 1500);
  };

  if (!isPlaying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-game-primary/20 to-background p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Math Champions! 🏆</h1>
          <p className="text-xl text-gray-600">Test your math skills and compete for the top score!</p>
        </div>
        <div className="w-full max-w-md space-y-4">
          <Input
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="text-lg"
          />
          <Button 
            onClick={handleStartGame}
            className="w-full bg-game-primary hover:bg-game-primary/90 text-lg h-12"
          >
            Start Game
          </Button>
        </div>
        {scores.length > 0 && (
          <div className="mt-8 w-full max-w-md">
            <ScoreBoard scores={scores} />
          </div>
        )}
      </div>
    );
  }

  if (gameState.isGameOver) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-game-primary/20 to-background p-4">
        <div className="text-center mb-8 animate-bounce-custom">
          <h1 className="text-4xl font-bold mb-4">Game Over! 🎮</h1>
          <p className="text-2xl">Your Score: {gameState.score}</p>
        </div>
        <div className="w-full max-w-md space-y-8">
          <ScoreBoard scores={scores} />
          <Button 
            onClick={() => setIsPlaying(false)}
            className="w-full bg-game-primary hover:bg-game-primary/90 text-lg h-12"
          >
            Play Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-game-primary/20 to-background p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <p className="text-xl mb-2">Player: {playerName}</p>
          <p className="text-2xl font-bold">Score: {gameState.score}</p>
          <p className="text-lg">Question {gameState.currentQuestion + 1} of {questions.length}</p>
        </div>
        <QuestionCard
          question={questions[gameState.currentQuestion]}
          onAnswer={handleAnswer}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
        />
      </div>
    </div>
  );
};

export default Index;