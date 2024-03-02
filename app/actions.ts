"use server";

import { db } from "@/db";
import { steps, tasks } from "@/db/schema";


export async function addstepAction(taskId: number, index: number, text: string) {
  await db.insert(steps).values({
    taskId: taskId,
    stepNumber: index,
    stepText: text,
  });
}

export async function adduserinputAction(input: string, title: string) {
  const newTask = await db.insert(tasks).values({
    taskName: title,
    userInput: input,
  }).returning(); 

  return newTask;
}




