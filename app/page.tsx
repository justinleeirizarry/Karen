"use client"

import React, { useState } from "react"
import ListoSteps from "@/components/StepsDisplay"
import TextInput from "@/components/TaskInput"
import { useChat } from "ai/react"


export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  const [showInput, setShowInput] = useState(true)

  return (
    <div>
      {showInput ? (
        <TextInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={(e) => {
            handleSubmit(e)
            setShowInput(false)
          }}
        />
      ) : (
        <ListoSteps messages={messages} />
      )}
    </div>
  )
}
