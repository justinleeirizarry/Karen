import { integer, pgTable, serial, text } from "drizzle-orm/pg-core"


export const steps = pgTable("steps", {
  stepId: serial("id").primaryKey(),
  stepNumber: integer("step_number"),
  stepText: text("step_text"),
})

export const tasks = pgTable("tasks", {
  taskId: serial("id").primaryKey(),
  stepId: integer("step_id").references(() => steps.stepId),
  taskName: text("task_name"),
  userInput: text("user_input"),
})

export type steps = typeof steps.$inferSelect
export type tasks = typeof tasks.$inferSelect
