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
    <ul>
      {lines.map((line, index) => (
        <li key={index} className="m-4 ">
          <div
            className={` border-white ${
              confirmedLines[index] ? "border-green-500" : "border"
            } rounded-xl bg-[#F5F5F7] flex items-center justify-between p-8 relative shadow inline-flex"`}
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
              <div className="flex-1 flex justify-between">
                <p className="flex-1">{line}</p>

                {confirmedLines[index] ? (
                  <Checkmark />
                ) : (
                  <div className="flex flex-row gap-1">
                    <div className="w-5 h-5 relative">
                      <div className="w-5 h-5 left-[1px] top-0 absolute bg-green-500 rounded-full" />
                      <div className="w-5 h-5 left-[1px] top-0 absolute text-center text-white flex justify-center items-center ">
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 12 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.89551 9.93628C5.25423 9.93628 5.53271 9.78996 5.73096 9.49731L10.8711 1.53931C10.9419 1.43075 10.9915 1.3269 11.0198 1.22778C11.0528 1.12866 11.0693 1.0319 11.0693 0.9375C11.0693 0.696777 10.9891 0.500895 10.8286 0.349854C10.6729 0.194092 10.4722 0.116211 10.2268 0.116211C10.0569 0.116211 9.91528 0.151611 9.802 0.222412C9.68872 0.288493 9.5778 0.401774 9.46924 0.562256L4.86719 7.88306L2.48828 4.82446C2.29948 4.58374 2.06584 4.46338 1.78735 4.46338C1.53719 4.46338 1.33187 4.54362 1.17139 4.7041C1.0109 4.85986 0.930664 5.05811 0.930664 5.29883C0.930664 5.40739 0.949544 5.51359 0.987305 5.61743C1.02507 5.71655 1.08879 5.82039 1.17847 5.92896L4.06006 9.51855C4.28662 9.79704 4.5651 9.93628 4.89551 9.93628Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="w-5 h-5 relative">
                      <div className="w-5 h-5 left-[1px] top-0 absolute bg-red-500 rounded-full" />
                      <div className="w-5 h-5 left-[1px] top-0 absolute flex justify-center items-center">
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.921875 11.4531C1.04688 11.5781 1.19531 11.6641 1.36719 11.7109C1.54427 11.7526 1.71875 11.7526 1.89062 11.7109C2.06771 11.6641 2.21875 11.5807 2.34375 11.4609L6 7.79688L9.66406 11.4531C9.78906 11.5833 9.9349 11.6693 10.1016 11.7109C10.2734 11.7526 10.4453 11.7526 10.6172 11.7109C10.7943 11.6641 10.9453 11.5755 11.0703 11.4453C11.2057 11.3203 11.2943 11.1719 11.3359 11C11.3776 10.8229 11.3776 10.6484 11.3359 10.4766C11.2943 10.3047 11.2083 10.1562 11.0781 10.0312L7.42969 6.36719L11.0781 2.71094C11.2083 2.58594 11.2943 2.4375 11.3359 2.26562C11.3776 2.09375 11.3776 1.92188 11.3359 1.75C11.2943 1.57292 11.2057 1.42188 11.0703 1.29688C10.9453 1.16667 10.7943 1.08073 10.6172 1.03906C10.4453 0.992188 10.2734 0.992188 10.1016 1.03906C9.9349 1.08073 9.78906 1.16406 9.66406 1.28906L6 4.94531L2.34375 1.28125C2.21875 1.16146 2.06771 1.08073 1.89062 1.03906C1.71875 0.992188 1.54427 0.992188 1.36719 1.03906C1.19531 1.08073 1.04688 1.16406 0.921875 1.28906C0.791667 1.41927 0.705729 1.57292 0.664062 1.75C0.622396 1.92188 0.622396 2.09375 0.664062 2.26562C0.705729 2.4375 0.789062 2.58594 0.914062 2.71094L4.57812 6.36719L0.914062 10.0312C0.789062 10.1562 0.705729 10.3047 0.664062 10.4766C0.622396 10.6484 0.622396 10.8229 0.664062 11C0.705729 11.1719 0.791667 11.3229 0.921875 11.4531Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="w-5 h-5 relative">
                      <div className="w-5 h-5 left-[1px] top-0 absolute bg-blue-500 rounded-full" />
                      <div className="w-5 h-5 left-[1px] top-0 absolute text-center text-white flex justify-center items-center">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 22 43"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 28.4697C11.1361 28.4697 11.265 28.4447 11.3867 28.3945C11.5156 28.3372 11.6266 28.2585 11.7197 28.1582L20.0342 19.6396C20.2275 19.4463 20.3242 19.2171 20.3242 18.9521C20.3242 18.766 20.2812 18.5977 20.1953 18.4473C20.1094 18.2969 19.9912 18.1787 19.8408 18.0928C19.6976 18.0068 19.5329 17.9639 19.3467 17.9639C19.0817 17.9639 18.849 18.057 18.6484 18.2432L10.4199 26.6543H11.5693L3.34082 18.2432C3.14746 18.057 2.91471 17.9639 2.64258 17.9639C2.45638 17.9639 2.28809 18.0068 2.1377 18.0928C1.99447 18.1787 1.87988 18.2969 1.79395 18.4473C1.70801 18.5977 1.66504 18.766 1.66504 18.9521C1.66504 19.0882 1.6901 19.2171 1.74023 19.3389C1.79036 19.4535 1.86198 19.5573 1.95508 19.6504L10.2695 28.1582C10.4844 28.3659 10.7279 28.4697 11 28.4697Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
