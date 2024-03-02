import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Step } from "./Step"
import { useSteps } from "@/context/TaskStepContext"

export interface StepProp {
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
      <ul className="list-none">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="sticky m-4"
            style={
              {
                top: `${index * 40}px`,
                zIndex: 10 + index,
              } as React.CSSProperties
            }
          >
            <Step message={step} index={index} />
          </li>
        ))}
      </ul>

      {allConfirmed && <Link href="/dashboard">Go to Dashboard</Link>}
    </div>
  )
}

export default Steps
