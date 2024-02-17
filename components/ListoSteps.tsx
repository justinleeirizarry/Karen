import React from "react";
import { Steps } from "./Steps";

type Role = "user" | "assistant" | "function" | "data" | "system" | "tool";

interface Message {
  id: string;
  content: string;
  role: Role;
}

interface MessageSectionProps {
  messages: Message[];
}

function ListoSteps({ messages }: MessageSectionProps) {
  const hasNonUserMessages = messages.some((m) => m.role === "assistant");
  console.log(messages);
  return (
    <div>
      <div className="border w-screen justify-center p-12 text-2xl">
        {hasNonUserMessages && (
          <header className="flex justify-center font-bold w-full text-[8rem] p-14">
            <span>Confirm</span>
            <span className="text-cyan-500 px-8">Every</span>
            <span>Step.</span>
          </header>
        )}
        <Steps messages={messages} />
      </div>
    </div>
  );
}

export default ListoSteps;
