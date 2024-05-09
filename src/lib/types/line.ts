import z from "zod";

export const createLineSchema = z.object({
    number: z.number({
        message: 'number must be a number',
    }),
    origin: z.string({
        message: 'origin must be a string',
    }),
    destination: z.string({
        message: 'destination must be a string',
    }),
});

export const updateLineSchema = z.object({
    number: z.number().optional(),
    origin: z.string().optional(),
    destination: z.string().optional(),
});

export type CreateLineInput = z.infer<typeof createLineSchema>;
export type UpdateLineInput = z.infer<typeof updateLineSchema>;