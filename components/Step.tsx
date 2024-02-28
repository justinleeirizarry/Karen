import React from "react"
import ConfirmButton from "./ConfirmButton"
import TextEditor from "./TextEditor"
import { useStepManager } from "./hooks/useStepManager"
import { Button } from "./ui/button"
import { Message } from "./Steps"
import ActionButtons from "./ActionButtons"

interface StepItemProps {
  message: Message
  index: number
}

export const Step: React.FC<StepItemProps> = ({ message, index }) => {
  const {
    handleEdit,
    handleDelete,
    handleInputChange,
    handleSave,
    handleConfirm,
    handleInsertStepAtIndex,
    editingLineIndex,
  } = useStepManager("")

  const isEditing = editingLineIndex === index

  return (
    <div className="mt-2">
      <div
        className={`sticky m-4 min-h-[5rem] justify-center rounded-full p-12 text-2xl transition-all duration-100 ${
          message.confirmed
            ? "border-4 border-black bg-teal-500"
            : "border-4 border-black bg-white [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
        }`}
      >
        {isEditing ? (
          <TextEditor
            line={message.content}
            onSave={() => handleSave(message.id)}
            onChange={handleInputChange}
            onDelete={() => handleDelete(message.id)}
            onAdd={() => handleInsertStepAtIndex(index)}
            showAddStep={true}
          />
        ) : (
          <div className="flex justify-between gap-3">
            <p className="flex-1">{message.content}</p>
            <ActionButtons
              isConfirmed={message.confirmed}
              onConfirm={() => handleConfirm(message.id)}
              onEdit={() => handleEdit(message.id)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
