import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Step } from "./Step"
import { useSteps } from "@/contexts/TaskStepContext"
import { v4 as uuidv4 } from "uuid"


export interface Message {
  id: string
  content: string
  role: string
  confirmed: boolean
}

const Steps: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const { steps, setSteps, setUserInput } = useSteps()
  const [allConfirmed, setAllConfirmed] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const latestUserMessage = messages.find((m) => m.role === "user")
    if (latestUserMessage) {
      setUserInput(latestUserMessage.content)
    }

    const instructions = messages
      .filter((message) => message.role !== "user")
      .flatMap((message) =>
        message.content.split("\n").map((line) => ({
          id: uuidv4(),
          content: line.replace(/^\d+\.\s*/, ""),
          confirmed: false,
        }))
      )

    if (instructions.length > 0) {
      setSteps(instructions)
      setLoading(false)
    }
  }, [messages, setSteps, setUserInput])

  useEffect(() => {
    setAllConfirmed(steps.every((step) => step.confirmed))
  }, [steps])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {messages
        .filter((m) => m.role !== "user")
        .map((message) => (
          <div key={message.id} className="mt-2">
            <Step message={message} />
          </div>
        ))}
      {allConfirmed && <Link href="/dashboard">Go to Dashboard</Link>}
    </div>
  )
}

export default Steps
