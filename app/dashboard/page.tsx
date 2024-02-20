"use client";

import React from "react";
import { useSteps } from "@/contexts/TaskStepContext";

export default function Dashboard() {
  const { steps, userInput } = useSteps();

  return (
    <div className="m-8">
      <h1 className=" text-5xl">Dashboard Test</h1>

      <div className="m-8">
        <h2 className="text-2xl">User Input:</h2>
        <p>{userInput || "No user input available"}</p>
      </div>
      <div className="m-8">
        <h2 className="text-2xl ">Steps</h2>
        {steps.length > 0 ? (
          <ul className="list-decimal pl-5">
            {" "}
            {/* Ensure proper padding for the bullet/number */}
            {steps.map((step, index) => (
              <li key={step.id || index}>{step.content}</li>
            ))}
          </ul>
        ) : (
          <p>No steps available.</p>
        )}
      </div>
    </div>
  );
}
