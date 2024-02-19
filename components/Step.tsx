import React, { useState, useCallback, useEffect } from "react";
import { Message } from "./Steps";
import StepEditor from "./StepEditor";
import { Button } from "./ui/button";
import { useSteps } from "@/contexts/TaskStepContext";
import ConfirmButton from "./ConfirmButton";
import Link from "next/link";

interface MessageItemProps {
  message: Message;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  updateMessageContent: (id: string, newContent: string) => void;
}

export const Step: React.FC<MessageItemProps> = ({
  message,
  setEditing,
  updateMessageContent,
}) => {
  const [editingLineIndex, setEditingLineIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [allConfirmed, setAllConfirmed] = useState<boolean>(false);

  const { steps, addStep, removeStep, updateStep, confirmStep, setSteps } =
    useSteps();

  useEffect(() => {
    // This initialization logic might need adjustment to ensure IDs are unique and managed properly
    const initialSteps = message.content.split("\n").map((line, index) => ({
      id: index, // Placeholder for ID, consider using context or a more robust ID generation strategy
      content: line.replace(/^\d+\.\s*/, ""),
      confirmed: false,
    }));

    setSteps(initialSteps); // Initialize steps based on message content
  }, [message.content, setSteps]);

  const handleEdit = useCallback(
    (id: number) => {
      const stepIndex = steps.findIndex((step) => step.id === id);
      setEditingLineIndex(stepIndex);
      setEditedText(steps[stepIndex].content);
      setEditing(true);
    },
    [steps, setEditing]
  );

  const handleDelete = useCallback(
    (id: number) => {
      removeStep(id);
      if (editingLineIndex !== null && steps[editingLineIndex]?.id === id) {
        setEditing(false);
        setEditingLineIndex(null);
      }
    },
    [removeStep, steps, editingLineIndex, setEditing]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditedText(event.target.value);
    },
    []
  );

  const handleSave = useCallback(
    (id: number) => {
      updateStep(id, editedText);
      setEditingLineIndex(null);
      setEditing(false);
    },
    [editedText, updateStep, setEditing]
  );

  const handleConfirm = useCallback(
    (id: number) => {
      confirmStep(id);
    },
    [confirmStep]
  );

  useEffect(() => {
    setAllConfirmed(steps.every((step) => step.confirmed));
  }, [steps]);

  // Simplified for demonstration; consider implementing a more sophisticated approach for inserting at specific indices
  const handleInsertStepAtIndex = useCallback(
    (index: number) => {
      // Local ID generation for demonstration; consider using a more robust method
      const newId =
        steps.length > 0 ? Math.max(...steps.map((s) => s.id)) + 1 : 1;

      const newStep = { id: newId, content: "New Step", confirmed: false };
      const updatedSteps = [...steps];
      updatedSteps.splice(index + 1, 0, newStep); // Insert the new step after the current index

      setSteps(updatedSteps); // Assuming this updates the entire steps array in your context
    },
    [steps, setSteps]
  );

  return (
    <ul className="list-none">
      {steps.map((step, index) => {
        const isEditing = editingLineIndex === index;
        return (
          <li
            key={step.id}
            className="m-4 sticky"
            style={{ top: `${index * 40}px`, zIndex: 10 + index }}
          >
            <div
              className={`rounded-full min-h-[5rem] p-12 text-2xl justify-center transition-all duration-100 ${
                step.confirmed
                  ? "bg-teal-500 border-4 border-black"
                  : "bg-white [box-shadow:5px_5px_rgb(82_82_82)] border-4 border-black active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
              }`}
            >
              {isEditing ? (
                <StepEditor
                  line={step.content}
                  onSave={() => handleSave(step.id)}
                  onChange={handleInputChange}
                  onDelete={() => handleDelete(step.id)}
                  onAdd={() => handleInsertStepAtIndex(index)}
                />
              ) : (
                <div className="flex justify-between gap-3">
                  <p className="flex-1">{step.content}</p>
                  <ConfirmButton
                    isConfirmed={step.confirmed}
                    onClick={() => handleConfirm(step.id)}
                  />
                  {!step.confirmed && (
                    <Button onClick={() => handleEdit(step.id)}>Edit</Button>
                  )}
                </div>
              )}
            </div>
          </li>
        );
      })}
      {allConfirmed && <Link href="/dashboard">Go to Dashboard</Link>}
    </ul>
  );
};
