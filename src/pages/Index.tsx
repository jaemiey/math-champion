import { QuestionCard } from "@/components/QuestionCard";
import { GameStart } from "@/components/GameStart";
import { GameOver } from "@/components/GameOver";
import { AIQuizAgent } from "@/components/AIQuizAgent";
import { APIKeyInput } from "@/components/APIKeyInput";
import { useGameLogic } from "@/hooks/useGameLogic";

const Index = () => {
  const {
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
  } = useGameLogic();

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
          <p className="text-xl mb-2">{playerName}</p>
          <p className="text-2xl font-bold">Score: {gameState.score}</p>
          <p className="text-lg">
            Question {gameState.currentQuestion + 1} of {gameState.currentQuestions.length}
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
          onHintRequest={() => {}}
        />
      </div>
    </div>
  );
};

export default Index;