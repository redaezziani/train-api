import z from "zod";

export const createCarSchema = z.object({
    trainId: z.string(),
    type: z.enum(["first_class", "second_class"]),
    seatCount: z.number(),
    name: z.enum(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]),
});

export const updateCarSchema = z.object({
    trainId: z.string(),
    type: z.enum(["first_class", "second_class"]),
    seatCount: z.number(),
});

export type CreateCarInput = {
    trainId: string;
    type: "first_class" | "second_class";
    seatCount: number;
    name: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
};

export type UpdateCarInput = {
    trainId: string;
    type: "first_class" | "second_class";
    seatCount: number;
    name : "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
};