import React from "react"
import Steps from "./Steps"

type Role = "user" | "assistant" | "function" | "data" | "system" | "tool"

interface ChatMessage {
  id: string
  content: string
  role: Role
}

interface StepsMessage extends ChatMessage {
  confirmed: boolean
}

interface StartingStepsProps {
  messages: ChatMessage[]
}

function ConfirmSteps({ messages }: StartingStepsProps) {
  const StepMessages: StepsMessage[] = messages.map((message) => ({
    ...message,
    confirmed: false,
  }))

  const Response = StepMessages.some((m) => m.role === "assistant")

  return (
    <div>
      <div className="w-screen justify-center p-12 text-2xl">
        {Response && (
          <header className="flex w-full justify-center p-14 text-[8rem] font-bold">
            <span>Confirm</span>
            <span className="px-8 text-cyan-500">Every</span>
            <span>Step.</span>
          </header>
        )}
        <Steps messages={StepMessages} />
      </div>
    </div>
  )
}

export default ConfirmSteps
