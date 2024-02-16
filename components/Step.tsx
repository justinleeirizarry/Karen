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
            className={`rounded-full bg-white min-h-[5rem] p-12 text-2xl justify-center transition-all duration-100 ${
              confirmedLines[index]
                ? " bg-green-500 border-4 border-black"
                : "[box-shadow:5px_5px_rgb(82_82_82)] border-4 border-black active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
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
                  className={`group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full font-medium text-neutral-200 transition-all duration-300 hover:w-32 ${
                    confirmedLines[index] ? "bg-green-300" : "bg-sky-300"
                  }`}
                >
                  <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100">
                    {confirmedLines[index] ? "Confirmed" : "Confirm"}
                  </div>
                  <div className="absolute right-3.5">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <path
                        d="M5.5 11L2 7.5L3.12132 6.37868L5.5 8.75736L11.8787 2.37868L13 3.5L5.5 11Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
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
