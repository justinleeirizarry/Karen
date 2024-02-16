import React, { useState, useCallback, useEffect } from "react";
import { Message } from "./Steps";
import StepEditor from "./StepEditor";
import { Button } from "./ui/button";
import { useSteps } from "../contexts/TaskStepContext";

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
  const [confirmedLines, setConfirmedLines] = useState<boolean[]>([]);

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
      console.log(`Confirmed content: ${content}`);
      setConfirmedLines((current) =>
        current.map((confirmed, i) => (i === index ? true : confirmed))
      );
    },
    [addStep, lines]
  );

  useEffect(() => {
    setConfirmedLines(new Array(lines.length).fill(false));
  }, [lines.length]);

  return (
    <ul className="list-none">
      {lines.map((line, index) => (
        <li
          key={index}
          className="m-4 sticky"
          style={{
            top: `${index * 40}px`,
            zIndex: 10 + index,
          }}
        >
          <div
            className={`rounded-full bg-white min-h-[5rem] p-12 text-2xl justify-center ${
              confirmedLines[index]
                ? "ring-4 ring-green-500"
                : "border-4 border-black"
            }`}
          >
            {editingLineIndex === index ? (
              <StepEditor
                line={line}
                onSave={() => handleSave(index)}
                onCancel={handleInputChange}
              />
            ) : (
              <div className="flex justify-between gap-3">
                <p className="flex-1">{line}</p>
                <Button
                  onClick={() => handleConfirm(index)}
                  className={`${
                    confirmedLines[index]
                      ? "bg-green-500 text-white"
                      : "bg-sky-300 text-white"
                  }`}
                >
                  {confirmedLines[index] ? "Confirmed" : "Confirm"}
                </Button>
                <Button
                  onClick={() => handleEdit(index, line)}
                  disabled={confirmedLines[index]}
                  className={`${
                    confirmedLines[index] ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
