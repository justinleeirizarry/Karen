"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

interface Step {
  id: string;
  content: string;
  confirmed: boolean;
}

interface StepsContextProps {
  steps: Step[];
  addStep: (stepContent: string) => void;
  removeStep: (stepId: string) => void;
  updateStep: (stepId: string, newContent: string) => void;
  confirmStep: (stepId: string) => void;
  setSteps: (steps: Step[]) => void;
  resetSteps: () => void;
}

const StepsContext = createContext<StepsContextProps | undefined>(undefined);

export const StepsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [steps, setSteps] = useState<Step[]>([]);

  const addStep = useCallback((stepContent: string) => {
    const newStep = { id: uuidv4(), content: stepContent, confirmed: false };
    setSteps((prevSteps) => [...prevSteps, newStep]);
  }, []);

  const removeStep = useCallback((stepId: string) => {
    setSteps((prevSteps) => prevSteps.filter((step) => step.id !== stepId));
  }, []);

  const updateStep = useCallback((stepId: string, newContent: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, content: newContent } : step
      )
    );
  }, []);

  const confirmStep = useCallback((stepId: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, confirmed: true } : step
      )
    );
  }, []);

  const resetSteps = useCallback(() => {
    setSteps([]);
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
