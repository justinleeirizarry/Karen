"use client"

import React, { useState } from "react"

import TextEditor from "./TextEditor"
import { useSteps } from "@/context/TaskStepContext"
import ActionButtons from "./ActionButtons"
import useUserInputEditor from "./hooks/useInputManager"

const InputEditor = () => {
  const {
    userInput,
    setUserInput,
    isEditingUserInput,
    isConfirmed,
    handleUserInputChange,
    toggleEditUserInput,
    handleConfirmUserInput,
  } = useUserInputEditor()
  return (
    <div>
      {isEditingUserInput ? (
        <TextEditor
          line={userInput}
          onSave={toggleEditUserInput}
          onChange={handleUserInputChange}
          onDelete={() => setUserInput("")}
          showAddStep={true}
        />
      ) : (
        <div
          className="min-h-[8rem] border-4 border-black"
          onClick={() => isConfirmed}
        >
          <span>{userInput}</span>
          <ActionButtons
            onEdit={toggleEditUserInput}
            onConfirm={handleConfirmUserInput}
            isConfirmed={isConfirmed}
          />
        </div>
      )}
    </div>
  )
}

export default InputEditor
