"use client"

import React, { useState } from "react"
import { useChat } from "ai/react"
import TaskInput from "./TaskInput"
import Confirmation from "@/components/Confirmation"
import { useParseMessages } from "./hooks/useParseMessages"

export default function Chat() {
  const [showInput, setShowInput] = useState(true)
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat()

  useParseMessages(messages)

  if (isLoading) {
    return <h1>Temporary Loading Screeeeeeeen......</h1>
  }

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
        <Confirmation />
      )}
    </div>
  )
}
