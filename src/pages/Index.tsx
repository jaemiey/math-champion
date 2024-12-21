import { useState, useEffect } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { GameStart } from "@/components/GameStart";
import { GameOver } from "@/components/GameOver";
import { AIQuizAgent } from "@/components/AIQuizAgent";
import { APIKeyInput } from "@/components/APIKeyInput";
import { useToast } from "@/components/ui/use-toast";
import { translations } from "@/config/languages";
import { openaiService } from "@/services/openai";
import { Score, GameState, Language, Question } from "@/types/game";
import { playCorrectSound, playIncorrectSound, playGameOverSound } from "@/utils/sounds";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAPIInput, setShowAPIInput] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedScores = localStorage.getItem("mathGameScores");
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
    
    const apiKey = localStorage.getItem("OPENAI_API_KEY");
    if (!apiKey) {
      setShowAPIInput(true);
    }
  }, []);

  const handleStartGame = async () => {
    if (!playerName.trim()) {
      toast({
        title: translations[language].enterName,
        variant: "destructive",
      });
      return;
    }

    const apiKey = localStorage.getItem("OPENAI_API_KEY");
    if (!apiKey) {
      setShowAPIInput(true);
      return;
    }

    setIsGenerating(true);
    try {
      console.log("Starting question generation...");
      const generatedQuestions = await openaiService.generateQuestions(
        gameState.selectedTopic,
        language
      );

      if (!generatedQuestions || generatedQuestions.length === 0) {
        throw new Error("No questions were generated");
      }

      console.log("Questions generated successfully:", generatedQuestions);
      setIsPlaying(true);
      setGameState({
        currentQuestion: 0,
        score: 0,
        isGameOver: false,
        selectedTopic: gameState.selectedTopic,
        currentQuestions: generatedQuestions
      });
    } catch (error) {
      console.error("Error in handleStartGame:", error);
      toast({
        title: language === 'en' ? "Error generating questions" : "Ralat menjana soalan",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      setIsGenerating(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    const isCorrect = answer === gameState.currentQuestions[gameState.currentQuestion].correctAnswer;
    
    if (isCorrect) {
      playCorrectSound();
      toast({
        title: translations[language].correct,
        className: "bg-game-success text-white",
      });
      setGameState(prev => ({
        ...prev,
        score: prev.score + 20,
      }));
    } else {
      playIncorrectSound();
      toast({
        title: translations[language].tryAgain,
        className: "bg-game-error text-white",
      });
    }

    setTimeout(() => {
      setIsAnswered(false);
      setSelectedAnswer(undefined);
      
      if (gameState.currentQuestion === gameState.currentQuestions.length - 1) {
        playGameOverSound();
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

  if (showAPIInput) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-game-primary/20 to-background p-4">
        <APIKeyInput 
          language={language} 
          onSubmit={() => setShowAPIInput(false)} 
        />
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <GameStart
        playerName={playerName}
        setPlayerName={setPlayerName}
        language={language}
        setLanguage={setLanguage}
        selectedTopic={gameState.selectedTopic}
        setSelectedTopic={(topic) => setGameState(prev => ({ ...prev, selectedTopic: topic }))}
        onStartGame={handleStartGame}
        scores={scores}
      />
    );
  }

  if (gameState.isGameOver) {
    return (
      <GameOver
        score={gameState.score}
        language={language}
        scores={scores}
        onPlayAgain={() => setIsPlaying(false)}
      />
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
        <AIQuizAgent
          language={language}
          isGenerating={isGenerating}
          onHintRequest={() => {
            toast({
              title: language === 'en' ? "Think about the concept!" : "Fikirkan konsepnya!",
              className: "bg-game-primary text-white",
            });
          }}
        />
      </div>
    </div>
  );
};

export default Index;