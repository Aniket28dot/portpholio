import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { fetchPortfolioContent } from '@/lib/portfolio-cms';
import type { PortfolioContent } from '@/lib/portfolio-content';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const getSystemInstruction = (portfolioContent: PortfolioContent) => `
You are an AI assistant for ${portfolioContent.name}'s personal portfolio.
Your goal is to answer questions about ${portfolioContent.name}'s work experience, projects, skills, and interests.

Context about ${portfolioContent.name}:
- Role: ${portfolioContent.role}
- Bio: ${portfolioContent.bio}
- Experience: ${JSON.stringify(portfolioContent.experience)}
- Projects: ${JSON.stringify(portfolioContent.projects)}
- Interests: ${portfolioContent.interests.join(', ')}

Guidelines:
1. Be professional, friendly, and concise.
2. If you don't know the answer based on the context, politely say you don't have that information and suggest contacting ${portfolioContent.name} directly via the contact section.
3. Keep responses relatively short (under 100 words).
4. Use markdown for better formatting if needed.
`;

export async function POST(request: Request) {
  try {
    const { messages, userMessage } = (await request.json()) as {
      messages: ChatMessage[];
      userMessage: string;
    };

    const apiKey =
      process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const portfolioContent = await fetchPortfolioContent();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...(messages ?? []).map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        })),
        { role: 'user', parts: [{ text: userMessage }] },
      ],
      config: {
        systemInstruction: getSystemInstruction(portfolioContent),
        temperature: 0.7,
      },
    });

    return NextResponse.json({
      text: response.text || "I'm sorry, I couldn't process that request.",
    });
  } catch (error) {
    console.error('API chat error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response.' },
      { status: 500 }
    );
  }
}
