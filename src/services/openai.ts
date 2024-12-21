import { Question } from "@/types/game";

export const openaiService = {
  generateQuestions: async (topic: string, language: string): Promise<Question[]> => {
    const apiKey = localStorage.getItem("OPENAI_API_KEY");
    if (!apiKey) {
      throw new Error("OpenAI API key not found");
    }

    console.log("Generating questions for topic:", topic, "language:", language);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a math teacher. Generate questions in valid JSON format only."
            },
            {
              role: "user",
              content: `Generate 5 ${topic} questions in ${language}. Return ONLY a JSON array with this exact format, no other text: [{id: number, question: string, options: string[], correctAnswer: string, topic: string}]`
            }
          ],
          temperature: 0.7,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        console.error("OpenAI API error:", response.status, response.statusText);
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Raw API response:", data);
      
      let questions;
      try {
        questions = JSON.parse(data.choices[0].message.content);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error("Invalid response format from API");
      }

      if (!Array.isArray(questions)) {
        throw new Error("Response is not an array of questions");
      }

      return questions;
    } catch (error) {
      console.error("Error generating questions:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to generate questions");
    }
  }
};