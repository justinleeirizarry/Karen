"use server";

import { db } from "@/db";
import { steps, tasks } from "@/db/schema";


export async function addstepAction(id: number, text:string) {
 await db.insert(steps).values({
            stepNumber: id,
            stepText: text,
            
          })

}