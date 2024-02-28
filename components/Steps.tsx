import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Step } from "./Step"
import { useSteps } from "@/context/TaskStepContext"

export interface Message {
  id: string
  content: string
  confirmed: boolean
}

const Steps: React.FC = () => {
  const { steps } = useSteps()
  const [allConfirmed, setAllConfirmed] = useState<boolean>(false)

  useEffect(() => {
    setAllConfirmed(steps.every((step) => step.confirmed))
  }, [steps])

  return (
    <div>
      {steps.map((step, index) => (
        <div key={index} className="mt-2">
          <Step message={step} index={index} />
        </div>
      ))}
      {allConfirmed && <Link href="/dashboard">Go to Dashboard</Link>}
    </div>
  )
}

export default Steps
