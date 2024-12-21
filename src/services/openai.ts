import { Question } from "@/types/game";

const generateQuestions = async (topic: string, language: string): Promise<Question[]> => {
  const systemPrompt = `You are a math teacher creating questions for ${topic}. 
    Generate 4 multiple choice questions suitable for students aged 9-10. 
    Each question must have exactly 4 options with only one correct answer.
    Return ONLY a JSON array of questions with no additional text or formatting.
    Each question must follow this exact format:
    {
      "id": number,
      "question": {
        "en": "Question in English",
        "ms": "Question in Malay"
      },
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": "exact match of one option",
      "topic": "${topic}"
    }`;

  console.log('Starting question generation for topic:', topic);
  
  try {
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
            content: 'Generate questions in the specified JSON array format. Return ONLY the JSON array.'
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    console.log('API Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`API Error: ${errorData.error?.message || 'Failed to generate questions'}`);
    }

    const data = await response.json();
    console.log('Raw API Response:', data);

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid API response structure:', data);
      throw new Error('Invalid API response structure');
    }

    const content = data.choices[0].message.content.trim();
    console.log('Response content:', content);

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(content);
      console.log('Parsed questions:', parsedQuestions);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Content that failed to parse:', content);
      throw new Error('Failed to parse response as JSON');
    }

    if (!Array.isArray(parsedQuestions)) {
      console.error('Parsed response is not an array:', parsedQuestions);
      throw new Error('Response is not an array of questions');
    }

    // Validate each question
    const validatedQuestions = parsedQuestions.map((q: any, index: number) => {
      console.log(`Validating question ${index + 1}:`, q);

      if (!q.id || !q.question?.en || !q.question?.ms || !Array.isArray(q.options) || !q.correctAnswer || !q.topic) {
        console.error(`Question ${index + 1} missing required fields:`, q);
        throw new Error(`Question ${index + 1} is missing required fields`);
      }
      
      if (q.options.length !== 4) {
        console.error(`Question ${index + 1} does not have exactly 4 options:`, q);
        throw new Error(`Question ${index + 1} must have exactly 4 options`);
      }

      if (!q.options.includes(q.correctAnswer)) {
        console.error(`Question ${index + 1} correctAnswer not in options:`, q);
        throw new Error(`Question ${index + 1} correctAnswer must be one of the options`);
      }

      return q as Question;
    });

    console.log('Successfully validated questions:', validatedQuestions);
    return validatedQuestions;
  } catch (error) {
    console.error('Error in generateQuestions:', error);
    throw error;
  }
};

export const openaiService = {
  generateQuestions
};