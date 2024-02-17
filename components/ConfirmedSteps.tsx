import React from "react";
import { useSteps } from "../contexts/TaskStepContext";

const ConfirmedStepsDisplay: React.FC = () => {
  const { steps } = useSteps();

  return (
    <div>
      <h2>Confirmed Steps</h2>
      <ul>
        {steps
          .filter((step) => step.content)
          .map((step, index) => (
            <li key={index}>{step.content}</li>
          ))}
      </ul>
    </div>
  );
};

export default ConfirmedStepsDisplay;