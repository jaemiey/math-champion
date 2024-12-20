export type Question = {
  id: number;
  question: {
    en: string;
    ms: string;
  };
  options: string[];
  correctAnswer: string;
  topic: "arithmetic" | "fractions" | "geometry" | "measurement";
};

export type Score = {
  playerName: string;
  score: number;
  date: string;
};

export type GameState = {
  currentQuestion: number;
  score: number;
  isGameOver: boolean;
  selectedTopic: string;
  currentQuestions: Question[];
};

export type Language = "en" | "ms";