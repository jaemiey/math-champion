import { useState, useEffect } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { ScoreBoard } from "@/components/ScoreBoard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { questions } from "@/data/questions";
import { Score, GameState, Language } from "@/types/game";
import { useToast } from "@/components/ui/use-toast";
import { translations } from "@/config/languages";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    isGameOver: false,
    selectedTopic: "arithmetic",
    currentQuestions: []
  });
  const [playerName, setPlayerName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [scores, setScores] = useState<Score[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [language, setLanguage] = useState<Language>("en");
  const { toast } = useToast();

  useEffect(() => {
    const savedScores = localStorage.getItem("mathGameScores");
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  const shuffleQuestions = (topic: string) => {
    const topicQuestions = [...questions[topic]];
    for (let i = topicQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [topicQuestions[i], topicQuestions[j]] = [topicQuestions[j], topicQuestions[i]];
    }
    return topicQuestions;
  };

  const handleStartGame = () => {
    if (!playerName.trim()) {
      toast({
        title: translations[language].enterName,
        variant: "destructive",
      });
      return;
    }
    const shuffledQuestions = shuffleQuestions(gameState.selectedTopic);
    setIsPlaying(true);
    setGameState({
      currentQuestion: 0,
      score: 0,
      isGameOver: false,
      selectedTopic: gameState.selectedTopic,
      currentQuestions: shuffledQuestions
    });
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    const isCorrect = answer === gameState.currentQuestions[gameState.currentQuestion].correctAnswer;
    
    if (isCorrect) {
      toast({
        title: translations[language].correct,
        className: "bg-game-success text-white",
      });
      setGameState(prev => ({
        ...prev,
        score: prev.score + 20,
      }));
    } else {
      toast({
        title: translations[language].tryAgain,
        className: "bg-game-error text-white",
      });
    }

    setTimeout(() => {
      setIsAnswered(false);
      setSelectedAnswer(undefined);
      
      if (gameState.currentQuestion === gameState.currentQuestions.length - 1) {
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-game-primary/20 to-background p-4 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 animate-bounce-custom">{translations[language].welcome}</h1>
          <p className="text-xl text-gray-600">{translations[language].subtitle}</p>
        </div>
        <div className="w-full max-w-md space-y-4">
          <Select
            value={language}
            onValueChange={(value: Language) => setLanguage(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={translations[language].chooseLanguage} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ms">Bahasa Melayu</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={gameState.selectedTopic}
            onValueChange={(value) => setGameState(prev => ({ ...prev, selectedTopic: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder={translations[language].chooseTopic} />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(questions).map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {translations[language].topics[topic as keyof typeof translations.en.topics]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder={translations[language].enterName}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="text-lg"
          />
          <Button 
            onClick={handleStartGame}
            className="w-full bg-game-primary hover:bg-game-primary/90 text-lg h-12 transform transition-all duration-200 hover:scale-105"
          >
            {translations[language].startGame}
          </Button>
        </div>
        {scores.length > 0 && (
          <div className="mt-8 w-full max-w-md animate-fade-in">
            <ScoreBoard scores={scores} language={language} />
          </div>
        )}
      </div>
    );
  }

  if (gameState.isGameOver) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-game-primary/20 to-background p-4">
        <div className="text-center mb-8 animate-bounce-custom">
          <h1 className="text-4xl font-bold mb-4">{translations[language].gameOver}</h1>
          <p className="text-2xl">{translations[language].yourScore}: {gameState.score}</p>
        </div>
        <div className="w-full max-w-md space-y-8">
          <ScoreBoard scores={scores} language={language} />
          <Button 
            onClick={() => setIsPlaying(false)}
            className="w-full bg-game-primary hover:bg-game-primary/90 text-lg h-12 transform transition-all duration-200 hover:scale-105"
          >
            {translations[language].playAgain}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-game-primary/20 to-background p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <p className="text-xl mb-2">{translations[language].player}: {playerName}</p>
          <p className="text-2xl font-bold">{translations[language].score}: {gameState.score}</p>
          <p className="text-lg">
            {translations[language].question} {gameState.currentQuestion + 1} {translations[language].of} {gameState.currentQuestions.length}
          </p>
        </div>
        <QuestionCard
          question={gameState.currentQuestions[gameState.currentQuestion]}
          onAnswer={handleAnswer}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
          language={language}
        />
      </div>
    </div>
  );
};

export default Index;