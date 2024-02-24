"use client"

import React, { useState } from "react"
import { useChat } from "ai/react"
import TaskInput from "./TaskInput"
import ConfirmSteps from "@/components/ConfirmSteps"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [showInput, setShowInput] = useState(true)

  return (
    <div>
      {showInput ? (
        <TaskInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={(e) => {
            handleSubmit(e)
            setShowInput(false)
          }}
        />
      ) : (
        <ConfirmSteps messages={messages} />
      )}
    </div>
  )
}
