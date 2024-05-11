import z from "zod";
export const createSeatSchema = z.object({
    carId: z.string({
        message: "please enter a valid car id",
    }),
    seatNumber: z.number({
        message: "please enter a valid seat number",
    }),
    isBooked: z.boolean().optional(),
});

export const updateSeatSchema = z.object({
    carId: z.string().optional(),
    seatNumber: z.number().optional(),
    isBooked: z.boolean().optional(),
});

export type CreateSeatInput = z.infer<typeof createSeatSchema>;
export type UpdateSeatInput = z.infer<typeof updateSeatSchema>;
// Path: src/routes/seat.ts