export const translations = {
  en: {
    welcome: "Math Champions! 🏆",
    subtitle: "Test your math skills and compete for the top score!",
    enterName: "Enter your name",
    startGame: "Start Game",
    topScores: "Top Scores",
    player: "Player",
    score: "Score",
    question: "Question",
    of: "of",
    playAgain: "Play Again",
    gameOver: "Game Over! 🎮",
    yourScore: "Your Score",
    chooseTopic: "Choose a Topic",
    topics: {
      arithmetic: "Arithmetic",
      fractions: "Fractions",
      geometry: "Geometry",
      measurement: "Measurement"
    },
    chooseLanguage: "Choose Language",
    correct: "Correct! 🎉",
    tryAgain: "Try again! 💪"
  },
  ms: {
    welcome: "Juara Matematik! 🏆",
    subtitle: "Uji kemahiran matematik anda dan bersaing untuk skor tertinggi!",
    enterName: "Masukkan nama anda",
    startGame: "Mula Permainan",
    topScores: "Skor Tertinggi",
    player: "Pemain",
    score: "Skor",
    question: "Soalan",
    of: "daripada",
    playAgain: "Main Semula",
    gameOver: "Tamat Permainan! 🎮",
    yourScore: "Skor Anda",
    chooseTopic: "Pilih Topik",
    topics: {
      arithmetic: "Aritmetik",
      fractions: "Pecahan",
      geometry: "Geometri",
      measurement: "Ukuran"
    },
    chooseLanguage: "Pilih Bahasa",
    correct: "Betul! 🎉",
    tryAgain: "Cuba lagi! 💪"
  }
};

export type Language = keyof typeof translations;