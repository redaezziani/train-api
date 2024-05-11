import express from "express";
import { getTrips, getTrip, createTrip,updateTrip, deleteTrip } from "../controllers/trip";
import { isAuthenticated, isAdmin } from "../middlewares/auth";
const tripRouter = express.Router();

tripRouter.get("/trips", getTrips);
tripRouter.get("/:id", getTrip);
tripRouter.post("/",  isAdmin, createTrip);
tripRouter.put("/:id", isAdmin, updateTrip);
tripRouter.delete("/:id", isAdmin, deleteTrip);    
export default tripRouter;
