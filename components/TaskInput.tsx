"use client";

import { Input } from "./ui/input";

interface TextareaWithButtonProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function TaskInput({
  input,
  handleInputChange,
  handleSubmit,
}: TextareaWithButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-full  px-4">
        <Input
          className=" h-[350px] cursor-text p-4 leading-[3rem] text-5xl border-none active:border-none focus;border-none "
          placeholder="Have clear expectations. Be specific. Give details "
          value={input}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default TaskInput;
