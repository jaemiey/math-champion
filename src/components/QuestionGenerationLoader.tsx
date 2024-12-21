import React from 'react';
import { Brain, Sparkles, Calculator } from 'lucide-react';
import { Language } from '@/types/game';

interface QuestionGenerationLoaderProps {
  language: Language;
}

export const QuestionGenerationLoader = ({ language }: QuestionGenerationLoaderProps) => {
  const steps = [
    {
      icon: <Brain className="w-8 h-8" />,
      text: language === 'en' ? 'Thinking of questions...' : 'Memikirkan soalan...',
      animation: 'animate-bounce-custom'
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      text: language === 'en' ? 'Calculating difficulty...' : 'Mengira kesukaran...',
      animation: 'animate-pulse'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      text: language === 'en' ? 'Adding some magic...' : 'Menambah sedikit magik...',
      animation: 'animate-scale-in'
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-game-accent/10 to-background rounded-lg">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex items-center space-x-4 ${step.animation} transition-all duration-500`}
          style={{ animationDelay: `${index * 0.5}s` }}
        >
          <div className="text-game-primary">{step.icon}</div>
          <p className="text-game-secondary font-medium">{step.text}</p>
        </div>
      ))}
    </div>
  );
};