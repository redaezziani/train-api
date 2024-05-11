import express from 'express';
import { getTickets, getTicket, createTicket,updateTicket,deleteTicket } from '../controllers/ticket';
import { isAuthenticated, isAdmin } from '../middlewares/auth';
const ticketRouter = express.Router();

ticketRouter.get("/tickets", getTickets);
ticketRouter.get("/:id", getTicket);
ticketRouter.post("/",  isAdmin, createTicket);
ticketRouter.put("/:id", isAdmin, updateTicket);
ticketRouter.delete("/:id", isAdmin, deleteTicket);
export default ticketRouter;