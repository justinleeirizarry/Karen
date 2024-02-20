"use client";

import React from "react";
import { useSteps } from "@/contexts/TaskStepContext";

export default function Dashboard() {
  const { steps, userInput } = useSteps();

  return (
    <div>
      <h1>Dashboard Test</h1>

      <div>
        <h2>Latest User Input:</h2>
        <p>{userInput || "No user input available"}</p>{" "}
      </div>

      <h2>Steps</h2>
      {steps.length > 0 ? (
        steps.map((step, index) => (
          <div key={step.id || index}>
            {" "}
            <p>{step.content}</p>
          </div>
        ))
      ) : (
        <p>No steps available.</p>
      )}
    </div>
  );
}
