"use client";

import { useChat } from "ai/react";
import React, { useState } from "react";
import TextareaWithButton from "../components/TextInput";
import { StepsProvider } from "../contexts/TaskStepContext";
import InitialBreakdown from "@/components/InitialBreakdown";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [showInput, setShowInput] = useState(true);
  console.log(messages, input);
  return (
    <StepsProvider>
      <div className="flex p-6 items-center justify-center ">
        <div className="flex flex-col justify-between p-11">
          {showInput ? (
            <TextareaWithButton
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={(e) => {
                handleSubmit(e);
                setShowInput(false);
              }}
            />
          ) : (
            <InitialBreakdown messages={messages} />
          )}
        </div>
      </div>
    </StepsProvider>
  );
}
