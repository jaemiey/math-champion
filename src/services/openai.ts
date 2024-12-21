import { Question } from "@/types/game";

export const openaiService = {
  generateQuestions: async (topic: string, language: string): Promise<Question[]> => {
    const apiKey = localStorage.getItem("OPENAI_API_KEY");
    if (!apiKey) {
      throw new Error("OpenAI API key not found");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a math teacher creating multiple choice questions."
          },
          {
            role: "user",
            content: `Generate 5 ${topic} questions in ${language} with 4 options each. Return as JSON array with format: [{id: number, question: {en: string, ms: string}, options: string[], correctAnswer: string, topic: string}]`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error("Failed to generate questions");
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  }
};