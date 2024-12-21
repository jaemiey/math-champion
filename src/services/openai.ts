import { Question } from "@/types/game";

const generateQuestions = async (topic: string, language: string): Promise<Question[]> => {
  const systemPrompt = `You are a friendly math teacher creating questions for ${topic}. 
    Generate 10 multiple choice questions suitable for students aged 9-10. 
    Each question should have 4 options with only one correct answer.
    Return the response in this exact format:
    [
      {
        "id": number,
        "question": {"en": "English question", "ms": "Malay question"},
        "options": ["option1", "option2", "option3", "option4"],
        "correctAnswer": "correct option",
        "topic": "${topic}"
      }
    ]`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: 'system',
          content: systemPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    }),
  });

  const data = await response.json();
  console.log('OpenAI Response:', data); // Debug log
  
  if (!response.ok) {
    throw new Error(`API Error: ${data.error?.message || 'Unknown error'}`);
  }

  const questions = JSON.parse(data.choices[0].message.content);
  console.log('Parsed Questions:', questions); // Debug log
  
  return questions;
};

export const openaiService = {
  generateQuestions
};