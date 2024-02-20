"use client";

import { useChat } from "ai/react";
import React, { useState } from "react";
import TextareaWithButton from "@/components/TextInput";

import ListoSteps from "@/components/ListoSteps";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [showInput, setShowInput] = useState(true);

  const userInputs = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content);

  console.log(userInputs);

  return (
    <div>
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
        <ListoSteps messages={messages} />
      )}
    </div>
  );
}
