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
        <Button
          className=" flex-col text-5xl font-bold whitespace-normal break-words w-full min-h-[21rem] mt-8 bg-transparent border-[1rem] rounded-full border-black hover:bg-sky-300 text-black py-2 px-4 leading-[2.5rem] line-clamp-3 max-w-prose"
          type="submit"
        >
          <span className=" text-7xl font-black leading-[6.5rem]">
            This is a button
          </span>
        </Button>
      </form>
    </div>
  );
}
