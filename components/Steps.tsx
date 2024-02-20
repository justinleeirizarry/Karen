import React, { useEffect, useState } from "react";
import { Step } from "./Step";

export interface Message {
  id: string;
  content: string;
  role: string;
  confirmed: boolean;
}

export const Steps: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const [localMessages, setLocalMessages] = useState<Message[]>([]);

  useEffect(() => {
    setLocalMessages(messages);
    // console.log(messages);
  }, [messages]);

  const filteredMessages = localMessages.filter((m) => m.role !== "user");

  const updateMessageContent = (id: string, newContent: string) => {
    console.log(`Updating message ${id} with new content: ${newContent}`);
    const updatedMessages = localMessages.map((message) =>
      message.id === id ? { ...message, content: newContent } : message
    );
    setLocalMessages(updatedMessages);
  };

  return (
    <div>
      {filteredMessages.map((message) => (
        <div key={message.id} className="mt-2">
          <Step
            message={message}
            setEditing={() => {}}
            updateMessageContent={updateMessageContent}
          />
        </div>
      ))}
    </div>
  );
};
