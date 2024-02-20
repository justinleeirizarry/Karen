"use client";

import { useChat } from "ai/react";

import React, { useState } from "react";
import TextInput from "@/components/TaskInput";

import ListoSteps from "@/components/StepsDisplay";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [showInput, setShowInput] = useState(true);

  return (
    <div>
      {showInput ? (
        <TextInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={(e) => {
            handleSubmit(e);
            setShowInput(false);
          }}
        />
      ) : (
        <ListoSteps messages={messages} />
      )}
    </div>
  );
}
