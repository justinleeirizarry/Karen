"use client"

import { db } from "@/db"
import { steps } from "@/db/schema"
import { Input } from "./ui/input"

interface TaskInputProps {
  input: string
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

function TaskInput({ input, handleInputChange, handleSubmit }: TaskInputProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full  px-4">
        <Input
          className=" autofocus focus;border-none h-[350px] cursor-text border-none p-4 text-5xl leading-[3rem] active:border-none "
          placeholder="Have clear expectations. Be specific. Give details "
          value={input}
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}

export default TaskInput
