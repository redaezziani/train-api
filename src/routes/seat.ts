import express from "express";
import { getSeats, getSeat, createSeat, updateSeat, deleteSeat } from "../controllers/seat";
const seatRouter = express.Router();

// Seat Routes

seatRouter.get('/seats', getSeats);
seatRouter.get('/:id', getSeat);
seatRouter.post('/', createSeat);
seatRouter.put('/:id', updateSeat);
seatRouter.delete('/:id', deleteSeat);

export default seatRouter;