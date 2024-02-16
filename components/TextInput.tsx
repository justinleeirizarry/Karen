"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "./ui/input";

interface TextareaWithButtonProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function TextareaWithButton({
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
