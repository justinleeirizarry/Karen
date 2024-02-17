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
  // Adjusted to use an object for tracking confirmation statuses
  const [confirmedLines, setConfirmedLines] = useState<{
    [key: string]: boolean;
  }>({});
  const [allConfirmed, setAllConfirmed] = useState<boolean>(false);

  const { addStep } = useSteps();

  const lines = message.content.split("\n");

  const handleEdit = useCallback(
    (index: number, line: string) => {
      setEditingLineIndex(index);
      setEditedText(line);
      setEditing(true);
    },
    [setEditing]
  );

  const handleDelete = useCallback(
    (indexToDelete: number) => {
      const contentToDelete = lines[indexToDelete];
      const updatedLines = lines.filter((_, index) => index !== indexToDelete);
      updateMessageContent(message.id, updatedLines.join("\n"));

      setConfirmedLines((prevConfirmed) => {
        const updatedConfirmed = { ...prevConfirmed };
        delete updatedConfirmed[contentToDelete];
        return updatedConfirmed;
      });

      if (editingLineIndex === indexToDelete) {
        setEditing(false);
        setEditingLineIndex(null);
      }
    },
    [lines, message.id, updateMessageContent, editingLineIndex, setEditing]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditedText(event.target.value);
    },
    []
  );

  const handleSave = useCallback(
    (index: number) => {
      const updatedLines = [...lines];
      updatedLines[index] = editedText;
      updateMessageContent(message.id, updatedLines.join("\n"));
      setEditingLineIndex(null);
      setEditing(false);
    },
    [editedText, lines, message.id, updateMessageContent, setEditing]
  );

  const handleConfirm = useCallback(
    (index: number) => {
      const content = lines[index];
      addStep({ content });
      setConfirmedLines((prev) => ({ ...prev, [content]: true }));
    },
    [addStep, lines]
  );

  useEffect(() => {
    const newConfirmedLines = lines.reduce(
      (acc, line) => {
        acc[line] = confirmedLines[line] || false;
        return acc;
      },
      {} as { [key: string]: boolean }
    );
    setConfirmedLines(newConfirmedLines);

    setAllConfirmed(
      Object.values(newConfirmedLines).every((confirmed) => confirmed)
    );
  }, [lines, confirmedLines]);

  return (
    <ul className="list-none">
      {lines.map((line, index) => (
        <li
          key={index}
          className="m-4 sticky"
          style={{ top: `${index * 40}px`, zIndex: 10 + index }}
        >
          <div
            className={`rounded-full min-h-[5rem] p-12 text-2xl justify-center transition-all duration-100 ${
              confirmedLines[line]
                ? "bg-teal-500 border-4 border-black"
                : "bg-white [box-shadow:5px_5px_rgb(82_82_82)] border-4 border-black active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
            }`}
          >
            {editingLineIndex === index ? (
              <StepEditor
                line={line}
                onSave={() => handleSave(index)}
                onCancel={handleInputChange}
                onDelete={() => handleDelete(index)}
              />
            ) : (
              <div className="flex justify-between gap-3">
                <p className="flex-1">{line}</p>
                <ConfirmButton
                  isConfirmed={confirmedLines[line]}
                  onClick={() => handleConfirm(index)}
                />
                {!confirmedLines[line] && (
                  <Button onClick={() => handleEdit(index, line)} className="">
                    Edit
                  </Button>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
      {allConfirmed && <Link href="/dashboard">Dashboard</Link>}
    </ul>
  );
};
