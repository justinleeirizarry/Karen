import React, { createContext, useContext, useState } from "react";

interface Step {
  content: string;
}

interface StepsContextProps {
  steps: Step[];
  addStep: (step: Step) => void;
  removeStep: (content: string) => void;
  updateStep: (oldContent: string, newContent: string) => void;
}

const StepsContext = createContext<StepsContextProps | undefined>(undefined);

export const StepsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [steps, setSteps] = useState<Step[]>([]);

  const addStep = (step: Step) => {
    setSteps((prevSteps) => [...prevSteps, step]);
  };

  const removeStep = (content: string) => {
    setSteps((prevSteps) =>
      prevSteps.filter((step) => step.content !== content)
    );
  };

  const updateStep = (oldContent: string, newContent: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.content === oldContent ? { ...step, content: newContent } : step
      )
    );
  };

  return (
    <StepsContext.Provider value={{ steps, addStep, removeStep, updateStep }}>
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