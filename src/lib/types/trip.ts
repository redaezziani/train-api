import z from "zod";
/*

model Trip {
   id        String    @id @default(uuid()) @db.VarChar(36)
  train         Train    @relation(fields: [trainId], references: [id],onDelete: Cascade)
  trainId       String
  departureDate DateTime
  arrivalDate   DateTime
  tickets       Ticket[]
  from          String
  to            String
}
*/

export const createTripSchema = z.object({
    trainId: z.string({
        message: "please enter a valid train id",
    }),
    departureDate: z.string({
        message: "please enter a valid departure date",
    }),
    arrivalDate: z.string({
        message: "please enter a valid arrival date",
    }),
    from: z.string({
        message: "please enter a valid from",
    }),
    to: z.string({
        message: "please enter a valid to",
    }),
    isStarted : z.boolean().optional(),
});

export const updateTripSchema = z.object({
    trainId: z.string().optional(),
    departureDate: z.string().optional(),
    arrivalDate: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    isStarted : z.boolean().optional(),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;