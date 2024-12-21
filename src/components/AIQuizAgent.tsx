import { Brain, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { translations } from "@/config/languages";
import { Language } from "@/types/game";
import { useState } from "react";
import { QuestionGenerationLoader } from "./QuestionGenerationLoader";

interface AIQuizAgentProps {
  language: Language;
  onHintRequest?: () => void;
  isGenerating?: boolean;
}

export const AIQuizAgent = ({ language, onHintRequest, isGenerating }: AIQuizAgentProps) => {
  const [showMessage, setShowMessage] = useState(false);

  const messages = {
    en: [
      "Need a hint? I'm here to help!",
      "Take your time to think carefully!",
      "You're doing great! Keep going!",
    ],
    ms: [
      "Perlukan bantuan? Saya di sini!",
      "Ambil masa untuk berfikir dengan teliti!",
      "Bagus! Teruskan usaha!",
    ]
  };

  const randomMessage = () => {
    const messageList = messages[language];
    return messageList[Math.floor(Math.random() * messageList.length)];
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-4 bg-gradient-to-br from-game-accent/10 to-background">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Brain className="w-8 h-8 text-game-primary animate-pulse" />
        <CardTitle className="text-xl">
          {language === 'en' ? 'AI Quiz Assistant' : 'Pembantu Kuiz AI'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <QuestionGenerationLoader language={language} />
        ) : (
          <div className="space-y-4">
            {showMessage && (
              <p className="text-game-secondary animate-fade-in">
                {randomMessage()}
              </p>
            )}
            <div className="flex space-x-2">
              <Button
                onClick={() => setShowMessage(true)}
                className="flex-1 bg-game-primary hover:bg-game-primary/90"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Get Encouragement' : 'Dapatkan Galakan'}
              </Button>
              {onHintRequest && (
                <Button
                  onClick={onHintRequest}
                  variant="outline"
                  className="flex-1 border-game-primary text-game-primary hover:bg-game-primary/10"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Get Hint' : 'Dapatkan Petunjuk'}
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};