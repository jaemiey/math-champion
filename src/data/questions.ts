import { Question } from "@/types/game";

export const questions: Question[] = [
  {
    id: 1,
    question: "What is 12 × 8?",
    options: ["88", "96", "92", "86"],
    correctAnswer: "96",
    topic: "arithmetic"
  },
  {
    id: 2,
    question: "Which fraction is equal to 1/2?",
    options: ["2/4", "3/4", "1/4", "4/4"],
    correctAnswer: "2/4",
    topic: "fractions"
  },
  {
    id: 3,
    question: "What is 45 ÷ 5?",
    options: ["8", "9", "7", "10"],
    correctAnswer: "9",
    topic: "arithmetic"
  },
  {
    id: 4,
    question: "How many sides does a pentagon have?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "5",
    topic: "geometry"
  },
  {
    id: 5,
    question: "What is 156 + 244?",
    options: ["400", "390", "410", "380"],
    correctAnswer: "400",
    topic: "arithmetic"
  }
];