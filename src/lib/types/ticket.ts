import z from "zod";
/*
model Ticket {
   id        String    @id @default(uuid()) @db.VarChar(36)
  car        Car      @relation(fields: [carId], references: [id],onDelete: Cascade)
  carId      String
  seatNumber Int
  price      Float
  passenger  String
  trip       Trip     @relation(fields: [tripId], references: [id],onDelete: Cascade)
  tripId     String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  user       Users    @relation(fields: [userId], references: [id],onDelete: Cascade)
  userId     String
  Seat       Seat?    @relation(fields: [seatId], references: [id],onDelete: SetNull)
  seatId     String?
}
*/

export const createTicketSchema = z.object({
    carId: z.string({
        message: "please enter a valid car id",
    }),
    seatNumber: z.number({
        message: "please enter a valid seat number",
    }),
    price: z.number({
        message: "please enter a valid price",
    }),
    passenger: z.string({
        message: "please enter a valid passenger",
    }),
    tripId: z.string({
        message: "please enter a valid trip id",
    }),
    userId: z.string({
        message: "please enter a valid user id",
    }),
    seatId: z.string().optional(),
});

export const updateTicketSchema = z.object({
    carId: z.string().optional(),
    seatNumber: z.number().optional(),
    price: z.number().optional(),
    passenger: z.string().optional(),
    tripId: z.string().optional(),
    userId: z.string().optional(),
    seatId: z.string().optional(),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type UpdateTicketInput = z.infer<typeof updateTicketSchema>;