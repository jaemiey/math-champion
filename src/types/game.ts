export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  topic: "arithmetic" | "fractions" | "geometry";
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
};