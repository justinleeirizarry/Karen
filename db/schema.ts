import { integer, pgTable, serial, text } from "drizzle-orm/pg-core"


export const stepsTable = pgTable("steps", {
  stepId: serial("id").primaryKey(),
  stepNumber: integer("step_number"),
  stepText: text("step_text"),
})

export const tasksTable = pgTable("tasks", {
  taskId: serial("id").primaryKey(),
  stepId: integer("step_id").references(() => stepsTable.stepId),
  taskName: text("task_name"),
  userInput: text("user_input"),
})

export type steps = typeof stepsTable.$inferSelect
export type tasks = typeof tasksTable.$inferSelect
