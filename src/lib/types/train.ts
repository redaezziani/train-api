import z from "zod";

enum TrainStatus {
    active = "active",
    inactive = "inactive",
    maintenance = "maintenance",
}

export const createTrainSchema = z.object({
    name: z.string({
        message: "please enter a valid name",
    }),
    status: z.nativeEnum(TrainStatus, {
        message: "please enter a valid status one of active, inactive, maintenance",
    }),
    seatCount: z.number({
        message: "please enter a valid seat count",
    }),
    lineId: z.string({
        message: "please enter a valid line id",
    }),
});

export const updateTrainSchema = z.object({
    name: z.string().optional(),
    status: z.nativeEnum(TrainStatus).optional(),
    seatCount: z.number().optional(),
    lineId: z.string().optional(),
});


export type CreateTrainInput = z.infer<typeof createTrainSchema>;
export type UpdateTrainInput = z.infer<typeof updateTrainSchema>;