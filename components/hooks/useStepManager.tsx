import { useCallback, useState } from "react"
import { useSteps } from "@/contexts/TaskStepContext"
import { v4 as uuidv4 } from "uuid"


interface Step {
  id: string
  content: string
  confirmed: boolean
}

export const useStepManager = (initialContent: string) => {
  const [editingLineIndex, setEditingLineIndex] = useState<number | null>(null)
  const [editedText, setEditedText] = useState<string>("")

  const { steps, removeStep, updateStep, confirmStep, setSteps } = useSteps()

  const handleEdit = useCallback(
    (id: string) => {
      const stepIndex = steps.findIndex((step) => step.id === id)
      if (stepIndex >= 0) {
        setEditingLineIndex(stepIndex)
        setEditedText(steps[stepIndex].content)
      }
    },
    [steps]
  )

  const handleDelete = useCallback(
    (id: string) => {
      removeStep(id)
      if (editingLineIndex !== null && steps[editingLineIndex]?.id === id) {
        setEditingLineIndex(null)
      }
    },
    [removeStep, steps, editingLineIndex]
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditedText(event.target.value)
    },
    []
  )

  const handleSave = useCallback(
    (id: string) => {
      updateStep(id, editedText)
      setEditingLineIndex(null)
    },
    [editedText, updateStep]
  )

  const handleConfirm = useCallback(
    (id: string) => {
      confirmStep(id)
    },
    [confirmStep]
  )

  const handleInsertStepAtIndex = useCallback(
    (index: number) => {
      const newStep = {
        id: uuidv4(),
        content: "Silence isn't helpful. Please dont leave blank.",
        confirmed: false,
      }

      const updatedSteps = [...steps]
      updatedSteps.splice(index + 1, 0, newStep)

      setSteps(updatedSteps)
    },
    [steps, setSteps]
  )

  return {
    steps,
    editingLineIndex,
    editedText,
    handleEdit,
    handleDelete,
    handleInputChange,
    handleSave,
    handleConfirm,
    handleInsertStepAtIndex,
  }
}
