import { Question } from "@/types/game";

const generateQuestions = async (topic: string, language: string): Promise<Question[]> => {
  const systemPrompt = `You are a friendly math teacher creating questions for ${topic}. 
    Generate 10 multiple choice questions suitable for students aged 9-10. 
    Each question should have 4 options with only one correct answer.
    The response MUST be a JSON array of questions.
    Each question must include: id, question (with 'en' and 'ms' translations), options array, correctAnswer, and topic.
    Example format:
    [
      {
        "id": 1,
        "question": {
          "en": "What is 2 + 2?",
          "ms": "Berapakah 2 + 2?"
        },
        "options": ["3", "4", "5", "6"],
        "correctAnswer": "4",
        "topic": "arithmetic"
      }
    ]`;

  console.log('Generating questions for topic:', topic);
  
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
            content: 'Generate questions in JSON format. Return ONLY the JSON array with no additional text.'
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`API Error: ${errorData.error?.message || 'Failed to generate questions'}`);
    }

    const data = await response.json();
    console.log('Raw OpenAI Response:', data);

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid API response structure:', data);
      throw new Error('Invalid API response structure');
    }

    const content = data.choices[0].message.content;
    console.log('Response content:', content);

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(content);
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
      if (!q.id || !q.question?.en || !q.question?.ms || !Array.isArray(q.options) || !q.correctAnswer || !q.topic) {
        console.error(`Invalid question format at index ${index}:`, q);
        throw new Error(`Question at index ${index} is missing required fields`);
      }
      
      if (q.options.length !== 4) {
        console.error(`Question ${index} does not have exactly 4 options:`, q);
        throw new Error(`Question ${index} must have exactly 4 options`);
      }

      if (!q.options.includes(q.correctAnswer)) {
        console.error(`Question ${index} correctAnswer is not in options:`, q);
        throw new Error(`Question ${index} correctAnswer must be one of the options`);
      }

      return q as Question;
    });

    console.log('Successfully generated and validated questions:', validatedQuestions);
    return validatedQuestions;
  } catch (error) {
    console.error('Error in generateQuestions:', error);
    throw error;
  }
};

export const openaiService = {
  generateQuestions
};