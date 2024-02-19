import { useCallback } from "react";
import { useSteps } from "@/contexts/TaskStepContext";

export function useStepManager() {
  const { steps, setSteps } = useSteps();

  const handleAddStep = useCallback(
    (content: string) => {
      const newStep = { content, confirmed: false };
      setSteps((prevSteps) => [...prevSteps, newStep]);
    },
    [setSteps]
  );

  const handleUpdateStep = useCallback(
    (index: number, newContent: string) => {
      setSteps((prevSteps) =>
        prevSteps.map((step, idx) =>
          idx === index ? { ...step, content: newContent } : step
        )
      );
    },
    [setSteps]
  );

  const handleConfirmStep = useCallback(
    (index: number) => {
      setSteps((prevSteps) =>
        prevSteps.map((step, idx) =>
          idx === index ? { ...step, confirmed: true } : step
        )
      );
    },
    [setSteps]
  );

  const handleRemoveStep = useCallback(
    (index: number) => {
      setSteps((prevSteps) => prevSteps.filter((_, idx) => idx !== index));
    },
    [setSteps]
  );

  return {
    handleAddStep,
    handleUpdateStep,
    handleConfirmStep,
    handleRemoveStep,
  };
}
