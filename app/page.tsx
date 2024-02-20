"use client";

import { useChat } from "ai/react";

import React, { useState } from "react";
import TextareaWithButton from "@/components/TextInput";

import ListoSteps from "@/components/ListoSteps";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [showInput, setShowInput] = useState(true);

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
