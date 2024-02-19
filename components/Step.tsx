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
  const [isAddingStep, setIsAddingStep] = useState(false);

  const { steps, addStep, removeStep, updateStep, confirmStep, setSteps } =
    useSteps();

  useEffect(() => {
    const initialSteps = message.content
      .split("\n")
      .map((line) => line.replace(/^\d+\.\s*/, ""))
      .map((content) => ({ content, confirmed: false }));

    setSteps(initialSteps);
  }, [message.content, setSteps]);

  const handleEdit = useCallback(
    (index: number) => {
      setEditingLineIndex(index);
      setEditedText(steps[index].content);
      setEditing(true);
    },
    [setEditing, steps]
  );

  const handleDelete = useCallback(
    (indexToDelete: number) => {
      const contentToRemove = steps[indexToDelete].content;
      removeStep(contentToRemove);
      if (editingLineIndex === indexToDelete) {
        setEditing(false);
        setEditingLineIndex(null);
      }
    },
    [removeStep, editingLineIndex, setEditing, steps]
  );

  const handleAddStepClick = useCallback(() => {
    setIsAddingStep(true);
    setEditingLineIndex(null);
  }, []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditedText(event.target.value);
    },
    []
  );

  const handleSave = useCallback(
    (index: number) => {
      const oldContent = steps[index].content;
      updateStep(oldContent, editedText);
      setEditingLineIndex(null);
      setEditing(false);
    },
    [editedText, updateStep, setEditing, steps]
  );

  const handleConfirm = useCallback(
    (index: number) => {
      confirmStep(steps[index].content);
    },
    [confirmStep, steps]
  );

  useEffect(() => {
    setAllConfirmed(steps.every((step) => step.confirmed));
  }, [steps]);

  const handleSaveNewStep = useCallback(
    (newStepContent: string) => {
      addStep({ content: newStepContent, confirmed: false });
      setIsAddingStep(false);
    },
    [addStep]
  );

  return (
    <ul className="list-none">
      {steps.map((step, index) => {
        const isEditing = editingLineIndex === index;
        return (
          <li
            key={index}
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
                  onSave={() => handleSave(index)}
                  onCancel={handleInputChange}
                  onDelete={() => handleDelete(index)}
                />
              ) : (
                <div className="flex justify-between gap-3">
                  <p className="flex-1">{step.content}</p>
                  <ConfirmButton
                    isConfirmed={step.confirmed}
                    onClick={() => handleConfirm(index)}
                  />
                  {!step.confirmed && (
                    <Button onClick={() => handleEdit(index)}>Edit</Button>
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
