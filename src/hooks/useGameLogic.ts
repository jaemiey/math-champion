import { useState } from "react";
import { openaiService } from "@/services/openai";
import { useToast } from "@/hooks/use-toast";
import { Score, GameState, Language, Question } from "@/types/game";
import { playCorrectSound, playIncorrectSound, playGameOverSound } from "@/utils/sounds";

export const useGameLogic = () => {
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

  const handleStartGame = async () => {
    if (!playerName.trim()) {
      toast({
        title: language === 'en' ? "Please enter your name" : "Sila masukkan nama anda",
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

      if (!generatedQuestions || !Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
        throw new Error(language === 'en' ? "Invalid questions format received" : "Format soalan tidak sah");
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
        title: language === 'en' ? "Correct!" : "Betul!",
        className: "bg-game-success text-white",
      });
      setGameState(prev => ({
        ...prev,
        score: prev.score + 20,
      }));
    } else {
      playIncorrectSound();
      toast({
        title: language === 'en' ? "Try again!" : "Cuba lagi!",
        className: "bg-game-error text-white",
      });
    }

    setTimeout(() => {
      setIsAnswered(false);
      setSelectedAnswer(undefined);
      
      if (gameState.currentQuestion === gameState.currentQuestions.length - 1) {
        handleGameOver(isCorrect);
      } else {
        setGameState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
        }));
      }
    }, 1500);
  };

  const handleGameOver = (lastAnswerCorrect: boolean) => {
    playGameOverSound();
    const finalScore = lastAnswerCorrect ? gameState.score + 20 : gameState.score;
    
    const newScore: Score = {
      playerName,
      score: finalScore,
      date: new Date().toISOString(),
    };
    
    const newScores = [...scores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    
    setScores(newScores);
    localStorage.setItem("mathGameScores", JSON.stringify(newScores));
    setGameState(prev => ({ ...prev, isGameOver: true }));
  };

  return {
    gameState,
    setGameState,
    playerName,
    setPlayerName,
    isPlaying,
    setIsPlaying,
    scores,
    isAnswered,
    selectedAnswer,
    language,
    setLanguage,
    isGenerating,
    showAPIInput,
    setShowAPIInput,
    handleStartGame,
    handleAnswer
  };
};