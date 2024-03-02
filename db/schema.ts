import { integer, pgTable, serial, text } from "drizzle-orm/pg-core"


export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  taskName: text("task_name"),
  userInput: text("user_input"),
});

export const steps = pgTable("steps", {
  stepId: serial("id").primaryKey(),
  taskId: integer("task_id").references(() => tasks.id),
  stepNumber: integer("step_number"),
  stepText: text("step_text"),
});
export type steps = typeof steps.$inferSelect
export type tasks = typeof tasks.$inferSelect
