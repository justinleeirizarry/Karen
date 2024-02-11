import { NextRequest } from 'next/server';
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
 
import { ChatOpenAI } from '@langchain/openai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
 
export const runtime = 'edge';

const schema = z.object({
  number: z.number().describe("The number of the step in the process"),
  content: z.string().describe("The content of the step"),
});


/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
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
  /**
   * See a full list of supported models at:
   * https://js.langchain.com/docs/modules/model_io/models/
   */
  const model = new ChatOpenAI({
    temperature: 0.8,
    streaming: true,
  });

  const functionCallingModel = model.bind({
      functions: [
        {
          name: "output_formatter",
          description: "Should always be used to properly format output",
          parameters: zodToJsonSchema(schema),
        },
      ],
      function_call: { name: "output_formatter" },
    });
 
  /**
   * Chat models stream message chunks rather than bytes, so this
   * output parser handles serialization and encoding.
   */
  const outputParser = new BytesOutputParser();
 
  /*
   * Can also initialize as:
   *
   * import { RunnableSequence } from "langchain/schema/runnable";
   * const chain = RunnableSequence.from([prompt, model, outputParser]);
   */
  const chain = prompt
  .pipe(model)
  .pipe(outputParser);

 
  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join('\n'),
    input: currentMessageContent,
  });
 
  return new StreamingTextResponse(stream);
}