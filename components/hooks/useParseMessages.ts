import { Message  } from "ai/react"
import { useEffect } from "react";
import { useSteps } from "@/context/TaskStepContext";
import { extractSteps } from "./useStepExtractor"; 


export function usePareMessages(messages: Message[]) {
  
  const { setSteps, setUserInput } = useSteps();

  useEffect(() => {
    const assistantMessage = messages.find((m) => m.role === "assistant");
    if (assistantMessage) {
      const extractedSteps = extractSteps(assistantMessage);
      setSteps(extractedSteps);
    }

    const latestUserMessage = messages.find((m) => m.role === "user");
    if (latestUserMessage) {
      setUserInput(latestUserMessage.content);
    }
  }, [messages, setSteps, setUserInput]);
}
