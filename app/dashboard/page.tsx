"use client";

import React from "react";
import { useSteps } from "@/contexts/TaskStepContext";

export default function Dashboard() {
  const { steps } = useSteps();

  return (
    <div>
      <h1>Steps</h1>
      {steps.length > 0 ? (
        steps.map((step, index) => <p key={index}>{step.content}</p>)
      ) : (
        <p>No steps available</p>
      )}
    </div>
  );
}
