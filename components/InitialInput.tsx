import React from "react"
import TextareaWithButton from "./TaskInput"

interface InitialInputProps {
  input: string
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

function InitialInput({
  input,
  handleInputChange,
  onSubmit,
}: InitialInputProps) {
  return (
    <TextareaWithButton
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={onSubmit}
    />
  )
}

export default InitialInput
