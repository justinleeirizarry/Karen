"use server";

import { db } from "@/db";
import { steps, tasks } from "@/db/schema";


export async function addstepAction(taskId: number, stepNumber: number, text: string) {
  await db.insert(steps).values({
    taskId: taskId,
    stepNumber: stepNumber,
    stepText: text,
  });
}

 
export async function adduserinputAction(input: string, text: string) {
  const [newTask] = await db.insert(tasks).values({
    userInput: input,
    taskName: text,
  }).returning();

  return newTask.taskId;
}