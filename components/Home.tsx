"use client"

import React, { useState } from "react"
import { useChat } from "ai/react"
import TaskInput from "./TaskInput"
import Confirmation from "@/components/Confirmation"
import { usePareMessages } from "./hooks/useParseMessages"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat()
  const [showInput, setShowInput] = useState(true)

  usePareMessages(messages)

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
