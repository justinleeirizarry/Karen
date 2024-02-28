import React from "react"
import Steps from "./Steps"
import InputEditor from "./InputEditor"

const ConfirmSteps: React.FC = () => {
  return (
    <div>
      <div className="w-screen justify-center p-12 text-2xl">
        <InputEditor />
        <Steps />
      </div>
    </div>
  )
}

export default ConfirmSteps
