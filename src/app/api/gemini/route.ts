import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Gemini API with your API key
// You need to set this API key in your environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { prompt, category = 'general' } = await req.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Use the gemini-1.5-flash model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Create a system instruction based on the category
    let systemInstruction = '';
    switch (category) {
      case 'math':
        systemInstruction = 'You are an expert math tutor. Solve the following math problem step-by-step with clear explanations:';
        break;
      case 'physics':
        systemInstruction = 'You are an expert physics tutor. Solve the following physics problem step-by-step with clear explanations:';
        break;
      case 'chemistry':
        systemInstruction = 'You are an expert chemistry tutor. Solve the following chemistry problem step-by-step with clear explanations:';
        break;
      case 'programming':
        systemInstruction = 'You are an expert programmer. Solve the following programming problem step-by-step with clear explanations and code examples:';
        break;
      default:
        systemInstruction = 'You are an expert AI assistant. Solve the following problem with clear, detailed explanations:';
    }
    
    // Generate content based on the prompt with the system instruction
    const fullPrompt = `${systemInstruction}\n\n${prompt}`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ result: text });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
} 