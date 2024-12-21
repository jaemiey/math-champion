import { Question, Language } from "@/types/game";

export const openaiService = {
  generateQuestions: async (topic: string, language: Language): Promise<Question[]> => {
    const apiKey = localStorage.getItem("OPENAI_API_KEY");
    if (!apiKey) {
      throw new Error(language === 'en' ? "OpenAI API key not found" : "Kunci API OpenAI tidak dijumpai");
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
              content: "You are a math teacher. Generate questions in the exact format specified."
            },
            {
              role: "user",
              content: `Generate 5 ${topic} math questions. Each question should have both English and Malay versions. Return in this EXACT format:
              [
                {
                  "id": 1,
                  "question": {
                    "en": "English question text",
                    "ms": "Malay question text"
                  },
                  "options": ["option1", "option2", "option3", "option4"],
                  "correctAnswer": "correct option",
                  "topic": "${topic}"
                }
              ]`
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
        throw new Error(language === 'en' ? 
          `API error: ${response.statusText}` : 
          `Ralat API: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Raw API response:", data);
      
      let questions;
      try {
        const content = data.choices[0].message.content;
        questions = JSON.parse(content);
        
        // Validate the response structure
        if (!Array.isArray(questions)) {
          throw new Error("Response is not an array");
        }

        // Validate each question
        questions.forEach((q: any) => {
          if (!q.id || !q.question?.en || !q.question?.ms || !q.options || !q.correctAnswer || !q.topic) {
            throw new Error("Invalid question format");
          }
        });

        return questions;
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error(language === 'en' ? 
          "Invalid response format from API" : 
          "Format respons tidak sah dari API"
        );
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      throw new Error(
        language === 'en'
          ? error instanceof Error ? error.message : "Failed to generate questions"
          : error instanceof Error ? error.message : "Gagal menjana soalan"
      );
    }
  }
};