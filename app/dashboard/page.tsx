"use client";

import React from "react";
import { useSteps } from "@/contexts/TaskStepContext";

export default function Dashboard() {
  const { steps } = useSteps();

  return (
    <div>
      <h2>First Step</h2>
      {steps.length > 0 ? (
        steps.map((step, index) => <p key={index}>{step.content}</p>)
      ) : (
        <p>No steps available</p>
      )}
    </div>
  );
}
