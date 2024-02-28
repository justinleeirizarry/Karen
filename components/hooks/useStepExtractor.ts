import { Message } from "ai"
import { v4 as uuidv4 } from "uuid"


export const extractSteps = (message: Message) => {
    return message.content
      .split("\n")
      .filter((line) => /^\d+\./.test(line))
      .map((line) => ({
        id: uuidv4(), // Generates a new UUID for each step
        content: line.replace(/^\d+\.\s*/, ""),
        confirmed: false,
      }))
}