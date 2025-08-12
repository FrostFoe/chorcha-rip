
'use server';
/**
 * @fileOverview A simple AI chat flow.
 *
 * - chat - A function that handles the chat interaction.
 */

import { ai } from '@/ai/genkit';
import { generate } from 'genkit/ai';
import { Part } from 'genkit/content';
import { z } from 'zod';

const History = z.array(
  z.object({
    role: z.enum(['user', 'model']),
    content: z.array(
      z.object({
        text: z.string(),
      })
    ),
  })
);

export async function chat(history: z.infer<typeof History>): Promise<string> {
  return chatFlow(history);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: History,
    outputSchema: z.string(),
  },
  async (history) => {
    const response = await generate({
      model: 'googleai/gemini-2.0-flash',
      prompt: {
        messages: history,
      },
    });

    return response.text();
  }
);
