import React, { useState } from "react"
import { adduserinputAction } from "@/app/actions"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useSteps } from "@/context/TaskStepContext"

interface TaskInputProps {
  input: string
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

function TaskInput({ input, handleInputChange, handleSubmit }: TaskInputProps) {
  const [currentStep, setCurrentStep] = useState(1)

  const { setTitle, title, setTaskId } = useSteps()

  const NextStep = () => setCurrentStep(currentStep + 1)

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      NextStep()
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="h-fit w-3/6 p-8">
        <CardContent>
          {currentStep === 1 && (
            <>
              <Label className="text-xl">Title</Label>
              <Input
                className="w-full"
                onChange={handleTitleChange}
                onKeyDown={handleKeyPress}
                id="title-input"
                name="title"
                value={title}
              />
              <Button
                className="mt-2 w-full rounded-full bg-sky-500 py-2 text-white hover:bg-blue-600"
                onClick={NextStep}
              >
                Next
              </Button>
            </>
          )}
          {currentStep === 2 && (
            <form
              className="flex flex-col gap-4"
              onSubmit={async (event) => {
                event.preventDefault()
                const result = await adduserinputAction(input, title)
                setTaskId(result[0].id)
                handleSubmit(event)
              }}
            >
              <Label className="text-xl">Description</Label>
              <Input
                className="w-full"
                onChange={handleInputChange}
                id="description-input"
                value={input}
              />
              <Button
                type="submit"
                className="mt-2 w-full rounded-full bg-sky-500 py-2 text-white hover:bg-blue-600"
              >
                Submit
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TaskInput
