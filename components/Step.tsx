import React from "react"
import ConfirmButton from "./ConfirmButton"
import StepEditor from "./StepEditor"
import { useStepManager } from "./hooks/useStepManager"
import { Button } from "./ui/button"
import { addstepAction } from "@/app/actions"

interface Message {
  id: string
  content: string
  confirmed: boolean
}

interface MessageItemProps {
  message: Message
}

export const Step: React.FC<MessageItemProps> = () => {
  const {
    steps,
    editingLineIndex,
    editedText,
    handleEdit,
    handleDelete,
    handleInputChange,
    handleSave,
    handleConfirm,
    handleInsertStepAtIndex,
  } = useStepManager("")
  const handleInsertStepAtIndexTest = (index: number) => {
    console.log(`Inserting step at index: ${index}`)
  }
  return (
    <ul className="list-none">
      {steps.map((step, index) => {
        const isEditing = editingLineIndex === index
        return (
          <li
            key={step.id}
            className="sticky m-4"
            style={{ top: `${index * 40}px`, zIndex: 10 + index }}
          >
            <div
              className={`min-h-[5rem] justify-center rounded-full p-12 text-2xl transition-all duration-100 ${
                step.confirmed
                  ? "border-4 border-black bg-teal-500"
                  : "border-4 border-black bg-white [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
              }`}
            >
              {isEditing ? (
                <StepEditor
                  line={step.content}
                  onSave={() => handleSave(step.id)}
                  onChange={handleInputChange}
                  onDelete={() => handleDelete(step.id)}
                  onAdd={() => handleInsertStepAtIndex(index)}
                />
              ) : (
                <div className="flex justify-between gap-3">
                  <p className="flex-1">{step.content}</p>
                  <form
                    action={addstepAction.bind(null, index + 1, step.content)}
                  >
                    <ConfirmButton
                      isConfirmed={step.confirmed}
                      onClick={() => handleConfirm(step.id)}
                    />
                  </form>
                  {!step.confirmed && (
                    <Button onClick={() => handleEdit(step.id)}>Edit</Button>
                  )}
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
