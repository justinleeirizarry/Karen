"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextareaWithButtonProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function TextareaWithButton({
  input,
  handleInputChange,
  handleSubmit,
}: TextareaWithButtonProps) {
  return (
    <div className="grid w-full gap-2">
      <form onSubmit={handleSubmit}>
        <Textarea
          placeholder="Type your message here."
          value={input}
          onChange={handleInputChange}
        />
        <Button>Send message</Button>
      </form>
    </div>
  );
}
