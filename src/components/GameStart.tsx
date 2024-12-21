import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScoreBoard } from "@/components/ScoreBoard";
import { translations } from "@/config/languages";
import { Score, Language } from "@/types/game";
import { questions } from "@/data/questions";

interface GameStartProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  onStartGame: () => void;
  scores: Score[];
}

export const GameStart = ({
  playerName,
  setPlayerName,
  language,
  setLanguage,
  selectedTopic,
  setSelectedTopic,
  onStartGame,
  scores
}: GameStartProps) => {
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
          value={selectedTopic}
          onValueChange={(value) => setSelectedTopic(value)}
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
          onClick={onStartGame}
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
};