import { NextRequest } from "next/server"
import { ChatOpenAI } from "@langchain/openai"
import { StreamingTextResponse, Message as VercelChatMessage } from "ai"
import { PromptTemplate } from "langchain/prompts"
import { BytesOutputParser } from "langchain/schema/output_parser"

export const runtime = "edge"

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`
}

const TEMPLATE = ` It's your job to 
 
Current conversation:
{chat_history}
 
User: {input}
AI:`

export async function POST(req: NextRequest) {
  const body = await req.json()
  const messages = body.messages ?? []
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage)
  const currentMessageContent = messages[messages.length - 1].content

  const prompt = PromptTemplate.fromTemplate(TEMPLATE)

  const model = new ChatOpenAI({
    temperature: 0.8,
    streaming: true,
  })

  const outputParser = new BytesOutputParser()

  const chain = prompt.pipe(model).pipe(outputParser)

  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join("\n"),
    input: currentMessageContent,
  })

  return new StreamingTextResponse(stream)
}
