import React from "react";
import { Breakdown } from "./Breakdown";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "function" | "data" | "system" | "tool";
}

interface MessageSectionProps {
  messages: Message[];
}

function InitialBreakdown({ messages }: MessageSectionProps) {
  const transformedMessages = messages.map((msg) => ({
    ...msg,
    content: msg.content,
  }));

  const hasNonUserMessages = transformedMessages.some(
    (m) => m.role === "assistant"
  );

  return (
    <div className="col-span-1">
      <div className="flex justify-center p-6 text-xl ">
        {hasNonUserMessages && (
          <div className="text-3xl font-bold ">
            Please confirm <span className="text-cyan-500">every</span> step.
          </div>
        )}
        <Breakdown messages={transformedMessages} />
      </div>
    </div>
  );
}

export default InitialBreakdown;
