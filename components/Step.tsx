import React, { useState, useCallback, useEffect } from "react";
import { Message } from "./Breakdown";
import StepEditor from "./StepEditor";
import { StepMenu } from "./StepMenu";
import { useSteps } from "../contexts/TaskStepContext";
import Checkmark from "./Checkbox";

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
            className={`

            } border-t-2 border-black bg-white w-screen flex items-top pb-20 px-8`}
            onClick={() => handleConfirm(index)}
          >
            {editingLineIndex === index ? (
              <>
                <StepEditor
                  line={line}
                  onSave={() => handleSave(index)}
                  onCancel={handleInputChange}
                />
              </>
            ) : (
              <div className="flex-1 flex justify-between ">
                <p className="flex-1">{line}</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
