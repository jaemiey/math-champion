import { Question } from "@/types/game";

const generateQuestions = async (topic: string, language: string): Promise<Question[]> => {
  const systemPrompt = `You are a friendly math teacher creating questions for ${topic}. 
    Generate 10 multiple choice questions suitable for students aged 9-10. 
    Each question should have 4 options with only one correct answer.
    Return the response as a JSON array in this exact format:
    [
      {
        "id": number,
        "question": {"en": "English question", "ms": "Malay question"},
        "options": ["option1", "option2", "option3", "option4"],
        "correctAnswer": "correct option",
        "topic": "${topic}"
      }
    ]
    Ensure the response is a valid JSON array.`;

  console.log('Sending request to OpenAI with prompt:', systemPrompt);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: 'Generate the questions and return them in JSON format as specified.'
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    }),
  });

  const data = await response.json();
  console.log('OpenAI Response:', data);
  
  if (!response.ok) {
    console.error('OpenAI Error:', data);
    throw new Error(`API Error: ${data.error?.message || 'Unknown error'}`);
  }

  try {
    const parsedContent = JSON.parse(data.choices[0].message.content);
    console.log('Parsed Content:', parsedContent);
    
    // Check if the response has the expected structure
    if (!Array.isArray(parsedContent)) {
      throw new Error('Response is not an array');
    }

    // Validate each question object
    const questions = parsedContent.map((q: any) => {
      if (!q.id || !q.question?.en || !q.question?.ms || !q.options || !q.correctAnswer || !q.topic) {
        console.error('Invalid question format:', q);
        throw new Error('Invalid question format in response');
      }
      return q as Question;
    });

    return questions;
  } catch (error) {
    console.error('Error parsing OpenAI response:', error);
    throw new Error('Failed to parse OpenAI response');
  }
};

export const openaiService = {
  generateQuestions
};