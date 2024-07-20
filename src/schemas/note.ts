import { z } from "zod";

export const noteSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().default(''),
    userId: z.string()
})

export type Note = z.infer<typeof noteSchema>;