import React, { useState, useCallback, useEffect } from "react";
import { Message } from "./Steps";
import StepEditor from "./StepEditor";
import { Button } from "./ui/button";
import { useSteps } from "@/contexts/TaskStepContext";
import ConfirmButton from "./ConfirmButton";

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

  useEffect(() => {
    const areAllConfirmed = confirmedLines.every((confirmed) => confirmed);
    setAllConfirmed(areAllConfirmed);
  }, [confirmedLines]);

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
            className={`rounded-full min-h-[5rem] p-12 text-2xl justify-center transition-all duration-100 ${
              confirmedLines[index]
                ? "bg-teal-500 border-4 border-black"
                : "bg-white [box-shadow:5px_5px_rgb(82_82_82)] border-4 border-black active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
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
                <ConfirmButton
                  isConfirmed={confirmedLines[index]}
                  onClick={() => handleConfirm(index)}
                />

                {!confirmedLines[index] && (
                  <Button onClick={() => handleEdit(index, line)} className="">
                    Edit
                  </Button>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
      {allConfirmed && (
        <Button className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          All Steps Confirmed
        </Button>
      )}
    </ul>
  );
};
