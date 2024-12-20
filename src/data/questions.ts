import { Question } from "@/types/game";

export const questions: Record<string, Question[]> = {
  arithmetic: [
    {
      id: 1,
      question: { en: "What is 12 × 8?", ms: "Berapakah 12 × 8?" },
      options: ["88", "96", "92", "86"],
      correctAnswer: "96",
      topic: "arithmetic"
    },
    {
      id: 2,
      question: { en: "What is 156 + 244?", ms: "Berapakah 156 + 244?" },
      options: ["400", "390", "410", "380"],
      correctAnswer: "400",
      topic: "arithmetic"
    },
    {
      id: 3,
      question: { en: "What is 45 ÷ 5?", ms: "Berapakah 45 ÷ 5?" },
      options: ["8", "9", "7", "10"],
      correctAnswer: "9",
      topic: "arithmetic"
    },
    {
      id: 4,
      question: { en: "Calculate 17 × 6", ms: "Kira 17 × 6" },
      options: ["92", "102", "112", "122"],
      correctAnswer: "102",
      topic: "arithmetic"
    }
  ],
  fractions: [
    {
      id: 5,
      question: { en: "Which fraction is equal to 1/2?", ms: "Pecahan manakah yang sama dengan 1/2?" },
      options: ["2/4", "3/4", "1/4", "4/4"],
      correctAnswer: "2/4",
      topic: "fractions"
    },
    {
      id: 6,
      question: { en: "What is 1/4 + 1/4?", ms: "Berapakah 1/4 + 1/4?" },
      options: ["1/2", "2/4", "1/8", "3/4"],
      correctAnswer: "1/2",
      topic: "fractions"
    },
    {
      id: 7,
      question: { en: "Which is larger: 3/4 or 2/3?", ms: "Yang manakah lebih besar: 3/4 atau 2/3?" },
      options: ["3/4", "2/3", "Same", "Cannot compare"],
      correctAnswer: "3/4",
      topic: "fractions"
    }
  ],
  geometry: [
    {
      id: 8,
      question: { en: "How many sides does a pentagon have?", ms: "Berapakah sisi pentagon?" },
      options: ["4", "5", "6", "7"],
      correctAnswer: "5",
      topic: "geometry"
    },
    {
      id: 9,
      question: { en: "What is the total number of angles in a triangle?", ms: "Berapakah jumlah sudut dalam segitiga?" },
      options: ["180°", "360°", "90°", "270°"],
      correctAnswer: "180°",
      topic: "geometry"
    },
    {
      id: 10,
      question: { en: "How many vertices does a cube have?", ms: "Berapakah bucu kiub?" },
      options: ["6", "8", "10", "12"],
      correctAnswer: "8",
      topic: "geometry"
    }
  ],
  measurement: [
    {
      id: 11,
      question: { en: "How many centimeters are in 1 meter?", ms: "Berapa sentimeter dalam 1 meter?" },
      options: ["10", "100", "1000", "10000"],
      correctAnswer: "100",
      topic: "measurement"
    },
    {
      id: 12,
      question: { en: "What is 2.5 kg in grams?", ms: "Berapakah 2.5 kg dalam gram?" },
      options: ["250", "2500", "25", "25000"],
      correctAnswer: "2500",
      topic: "measurement"
    }
  ]
};