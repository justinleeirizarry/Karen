import { NextRequest } from 'next/server';
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
 
import { ChatOpenAI } from '@langchain/openai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';

 
export const runtime = 'edge';

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};
 
const TEMPLATE = `You are very powerful task mananger, you're job is to take in tasks and outputs the steps needed to accomplish that task. Include only the steps on your response Do not add any additional comments or exclamations. If a user asked for anything other than task break down respond with no.
 
Current conversation:
{chat_history}
 
User: {input}
AI:`;
 

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;
 
  const prompt = PromptTemplate.fromTemplate(TEMPLATE);
 
  const model = new ChatOpenAI({
    temperature: 0.8,
    streaming: true,
  });


  const outputParser = new BytesOutputParser();
 

  const chain = prompt
  .pipe(model)
  .pipe(outputParser);

 
  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join('\n'),
    input: currentMessageContent,
  });
 
  return new StreamingTextResponse(stream);
}