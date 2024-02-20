import React from "react";
import Steps from "./Steps";

type Role = "user" | "assistant" | "function" | "data" | "system" | "tool";

interface ChatMessage {
  id: string;
  content: string;
  role: Role;
}

interface StepsMessage extends ChatMessage {
  confirmed: boolean;
}

interface StartingStepsProps {
  messages: ChatMessage[];
}

function StepsDisplay({ messages }: StartingStepsProps) {
  const StepMessages: StepsMessage[] = messages.map((message) => ({
    ...message,
    confirmed: false,
  }));

  const Response = StepMessages.some((m) => m.role === "assistant");

  return (
    <div>
      <div className="w-screen justify-center p-12 text-2xl">
        {Response && (
          <header className="flex justify-center font-bold w-full text-[8rem] p-14">
            <span>Confirm</span>
            <span className="text-cyan-500 px-8">Every</span>
            <span>Step.</span>
          </header>
        )}
        <Steps messages={StepMessages} />
      </div>
    </div>
  );
}

export default StepsDisplay;
