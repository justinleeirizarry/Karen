"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

let nextId = 0; // Initialize ID counter outside the component for session-wide scope

const getNextId = () => {
  nextId += 1; // Increment the ID
  return nextId; // Return the new ID
};

interface Step {
  id: number; // Each step has a unique ID
  content: string;
  confirmed: boolean;
}

interface StepsContextProps {
  steps: Step[];
  addStep: (stepContent: string) => void; // Function to add a step
  removeStep: (stepId: number) => void; // Function to remove a step by ID
  updateStep: (stepId: number, newContent: string) => void; // Function to update a step by ID
  confirmStep: (stepId: number) => void; // Function to confirm a step by ID
  setSteps: (steps: Step[]) => void; // Function to directly set the steps array
  resetSteps: () => void; // Function to reset steps and ID counter
}

const StepsContext = createContext<StepsContextProps | undefined>(undefined);

export const StepsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [steps, setSteps] = useState<Step[]>([]);

  const addStep = useCallback((stepContent: string) => {
    const newStep = { id: getNextId(), content: stepContent, confirmed: false };
    setSteps((prevSteps) => [...prevSteps, newStep]);
  }, []);

  const removeStep = useCallback((stepId: number) => {
    setSteps((prevSteps) => prevSteps.filter((step) => step.id !== stepId));
  }, []);

  const updateStep = useCallback((stepId: number, newContent: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, content: newContent } : step
      )
    );
  }, []);

  const confirmStep = useCallback((stepId: number) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, confirmed: true } : step
      )
    );
  }, []);

  const resetSteps = useCallback(() => {
    setSteps([]); // Clear the steps array
    nextId = 0; // Reset the ID counter to start from 1 for the next step
  }, []);

  return (
    <StepsContext.Provider
      value={{
        steps,
        addStep,
        removeStep,
        updateStep,
        confirmStep,
        setSteps,
        resetSteps,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};

export const useSteps = () => {
  const context = useContext(StepsContext);
  if (!context) {
    throw new Error("useSteps must be used within a StepsProvider");
  }
  return context;
};
